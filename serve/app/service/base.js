/*
 * @Author: zhangjiaming
 * @Date: 2021-12-08 15:21:10
 * @LastEditors: zhangjiaming
 * @LastEditTime: 2022-01-06 12:07:45
 * @Descripttion:
 */
'use strict';
const Service = require('egg').Service;
const UUID = require('uuid');// 新增uuid时需使用  UUID.v1()方法根据时间戳生成随机id
const dayjs = require('dayjs');
const md5 = require('md5');

class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
    this.moment = dayjs;
  }
  uuid() {
    return UUID.v1();
  }

  md5(buf) {
    return md5(buf);
  }

  async cAddData(param, conn) {
    try {
      let result = null;
      if (conn) {
        result = await conn.insert(this.table, param);
      } else {
        result = await this.app.mysql.insert(this.table, param);
      }
      console.log(result, 'result');
      if (result.affectedRows === 1) {
        return {
          code: 200,
          data: {
            ...param,
          },
        };
      }
      return {
        code: 500,
      };

    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  }
  async cAddDataNoad(param, conn) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const params = { ...param, createTime: time, modifyTime: time };
    try {
      let result = null;
      if (conn) {
        result = await conn.insert(this.table, params);
      } else {
        result = await this.app.mysql.insert(this.table, params);
      }
      console.log(result, 'result');
      if (result.affectedRows === 1) {
        return {
          code: 200,
          data: {
            ...params,
            id: result.insertId,
          },
        };
      }
      return {
        code: 500,
      };

    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  }

  async cUpdateData(param, conn) {
    try {
      let result = null;
      if (conn) {
        console.log(this.table);
        result = await conn.update(this.table, param);
      } else {
        result = await this.app.mysql.update(this.table, param);
      }
      console.log(result, 'result');
      if (result.affectedRows === 1) {
        return {
          code: 200,
        };
      }
      return {
        code: 500,
      };

    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  }

  async cDelData(params, conn) {
    try {
      let result = null;
      if (conn) {
        result = await conn.delete(this.table, params);
      } else {
        result = await this.app.mysql.delete(this.table, params);
      }

      if (result.affectedRows) {
        return {
          code: 200,
        };
      }
      return {
        code: 500,
      };

    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  }

  // 通过select方法查询本service的表
  async cQueryData(params, orders, limit, offset, columns = '*') {
    try {
      const con = {
        where: params,
        columns,
      };
      orders && (con.orders = orders);
      limit && (con.limit = limit);
      offset && (con.offset = offset);
      const results = await this.app.mysql.select(this.table, con);
      return results;
    } catch (error) {
      return [];
    }
  }

  async cCopyData({ form, to, where }, conn) {
    const { table: FTable, keys: FKeys } = form;
    const { table: TTable, keys: TKeys } = to;

    let sql = `insert into ${FTable}(${FKeys.join(',')}) select ${TKeys.join(',')} from ${TTable} `;
    if (where) {
      sql += ` where ${where.join(' and ')}`;
    }
    console.log(sql);
    try {
      let results = null;
      if (conn) {
        results = await conn.query(sql);
      } else {
        results = await this.app.mysql.query(sql);
      }
      console.log(results);
      return { code: 200 };
    } catch (error) {
      return { code: 500 };
    }
  }

  // 直接执行简单sql，通过qury方法 （通用）
  async cMysqlQuery({ table, keys, where }, conn) {
    let sql = `select ${keys.join(' , ')} from ${table}`;

    if (where) {
      sql += ` where ${where.join(' and ')} `;
    }

    try {
      let res = null;
      if (conn) {
        res = await conn.query(sql);
      } else {
        res = await this.app.mysql.query(sql);
      }
      return res;
    } catch (error) {
      return [];
    }
  }

  /*
   *
   * @param {Array} querytables
   * [
   *      {
   *          table: "early_warn",          // 查询的表名
   *          keys: ['*', 'modifyTime'],    // 需要返回的字段
   *          accurateCon: { serialNo  },   // 精确查询条件
   *          vagueCon: { name: '123' },    // 模糊查询条件
   *          leftJoinCon: ["early_warn.signalId = wanging_signal_config.signalId"]    // 与前表关联条件（前表应先声明，在添加关联条件）
   *      }
   * ]
   * @param {*} queryCondition 额外补充查询条件
   * @param {*} page { pageNum, pageSize }
   * @param {*} cb 回调自定义内容函数
   * @return { code, data, msg }
   */
  async multiTableQuery(querytables, queryCondition, page, cb) {
    if (!page.pageNum || !page.pageSize) {
      return {
        code: 500,
        data: null,
        msg: '参数错误',
      };
    }

    const qTables = [];
    const qKeys = [];
    const qCondition = [ ...queryCondition ];
    querytables.forEach(({ table, keys, accurateCon, vagueCon, leftJoinCon }, index) => {
      if (leftJoinCon) {
        qTables.push(`left join ${table} on ${leftJoinCon.join('and')}`);
      } else {
        if (index === 0) {
          qTables.push(`${table}`);
        } else {
          qTables.push(`, ${table}`);
        }
      }

      const key = keys.map(key => {
        return `${table}.${key}`;
      });
      qKeys.push(...key);

      // 精确查询条件
      if (accurateCon) {
        Object.entries(accurateCon).forEach(([ key, value ]) => {
          value && qCondition.push(`${table}.${key} = '${value}'`);
        });
      }
      // 模糊查询条件
      if (vagueCon) {
        Object.entries(vagueCon).forEach(([ key, value ]) => {
          value && qCondition.push(`${table}.${key} like '%${value}%'`);
        });
      }
    });

    if (cb) {
      cb({ qCondition });
    }

    const sql = `select ${qKeys.join(',')} from ${qTables.join(' ')} ${qCondition.length ? 'where ' : ' '} ${qCondition.join(' and ')}  limit ${page.pageSize} offset ${(page.pageNum - 1) * page.pageSize};`;
    const totalSql = `select count(1) from ${qTables.join(' ')} ${qCondition.length ? 'where ' : ' '} ${qCondition.join(' and ')}`;
    console.log(sql);
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(totalSql);

    if (result && total) {
      const data = {
        code: 200,
        data: {
          pageNum: page.pageNum,
          pageSize: page.pageSize,
          total: JSON.parse(JSON.stringify(total))[0]['count(1)'],
          result,
        },
        msg: '',
      };
      return data;
    }
    return {
      code: 500,
    };

  }

  async sql(sql, conn) {
    try {
      let res = null;
      if (conn) {
        res = await conn.query(sql);
      } else {
        res = await this.app.mysql.query(sql);
      }
      return res;
    } catch (error) {
      return [];
    }
  }

}

module.exports = BaseService;

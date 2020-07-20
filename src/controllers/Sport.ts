import { Context } from 'koa';

/**
 * 动漫相关
 */
class Sport {
  /** 获取首页数据 */
  public async getHomeInfo(ctx: Context) {
    ctx.body = {
      result: {
        swipe: [
          {
            href: 'https://i.mooool.com/img/2020/05/alexhanazakilm110-.jpg',
            description: ''
          },
          {
            href: 'https://i.mooool.com/img/2020/07/20200702180401708.jpg',
            description: ''
          },
          {
            href:
              'https://i.mooool.com/img/2020/03/5c357c0ecb6fc-bp-cover-image.jpg',
            description: ''
          }
        ]
      }
    };
  }
}

export default new Sport();

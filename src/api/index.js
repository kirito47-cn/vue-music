import ajax from './ajax'

//获取轮播图地址
export  const  getBanner =async ()=> await ajax('/banner')

//获取歌单描述 http://39.108.182.125:3000/top/playlist?limit=10
export const getDisc = async (limit)=>await ajax('/top/playlist',{limit})
//获取歌手信息 cat:5001为入住歌手
export const getSingerList = async () =>await ajax('/artist/list',{cat:5001,limit:80})
//获取歌曲排行榜单
export const getRankList = async ()=>await ajax('/toplist/detail')
//获取歌手的单曲
 export const  SingerMusciList = async (id)=>ajax('/artists', {id})
 //获取热榜
 export const HotSearchKey =  async(limit) =>ajax('/search/hot',{limit}) 
 /**
   * music搜索
   */
export const MusicSearch = async (params) =>ajax('/search',params)
  /**
   * 歌单详情
   */
export const SongList = async  (id)=>  ajax('/playlist/detail', {id})
  
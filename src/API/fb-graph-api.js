/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const graphUrl = 'https://graph.facebook.com/v9.0/'
export const getUserAccounts = async (token) => {
  try {
    const fb_accounts = await axios.get(`${graphUrl}me/accounts`, {
      params: {
        fields: 'picture{url},name,instagram_business_account',
        access_token: token
      }
    })
    return fb_accounts.data.data
  } catch (error) {
    console.log('error', error);
  }
}
// 17841401054445962
export const getAllIgBizzAccounts = async (token) => {
  let ids = []
  console.log('token', token);
  const fbAccIds = await getUserAccounts(token)
  console.log('fbAccIds', fbAccIds);
  fbAccIds.map(({ instagram_business_account }) => (
    ids.push(instagram_business_account.id)
  ))
  try {
    const fetchData = await Promise.all(
      ids.map(async (id) => {
        const response = await axios.get(`${graphUrl}/${id}`, {
          params: {
            fields: 'name,profile_picture_url,followers_count,follows_count,media,media_count',
            access_token: token
          }
        })
        const igAccs = await response.data
        return igAccs
      })
      )
      console.log('fetchData', fetchData);
      return fetchData
    }
    catch (e) {
      console.log('error', e);
    }
}
export const getIgBizzAcc = async (token, fbAccId) => {
  try {
    const fbAcc = await axios.get(`${graphUrl}/${fbAccId}`, {
      params: {
        fields: 'instagram_business_account',
        access_token: token
      }
    })
    // console.log('fbAcc', fbAcc);
      const { instagram_business_account } = fbAcc.data
      const igAcc = await axios.get(`${graphUrl}/${instagram_business_account.id}`, {
        params: {
          fields: 'name,username,profile_picture_url,followers_count,follows_count,media,media_count',
          access_token: token
        }
      })
      return igAcc
  } catch (error) {
    return error
  }
}

export const getDataPerIgPost = async (token, data) => {
  let ids = []
  await data.forEach((item) => {
    ids.push(item.id)
  });
  try {
    const fetchData = await Promise.all(
      ids.map(async (id) => {
        const response = await axios.get(`${graphUrl}/${id}`, {
          params: {
            fields: 'comments.limit(50){replies{username,like_count,media,text},username,text},caption,comments_count,media_url,media_type,thumbnail_url',
            access_token: token
          }
        })
        const igPosts = await response.data
        return igPosts
      })
    )
    return fetchData
  } catch (error) {
    console.log(error)
  }
}
export const getComments = async( token, id) => {
  const response = await axios.get(`${graphUrl}/${id}`, {
    params: {
      fields: 'comments.limit(50){replies{username,like_count,media,text},username,text}',
      access_token: token
    }
  })
  const igPosts = await response.data
  const final = await getAllItems(igPosts.comments.data, igPosts.comments?.paging?.next)
  return final
  // return igPosts
}
async function getAllItems(items,hasMore){
  if (hasMore === undefined) {
    return items;
  } else {
    const response = await axios.get(hasMore);
    const data = await response.data
    const comms = [...items,...data.data]
    return await getAllItems(comms, response.data.paging ? response.data.paging.next : undefined) 
  }
}
// Data per post ID
// 18049315030064669?fields=caption,thumbnail_url,like_count,media_type,shortcode,media_url
// 18049315030064669?fields=thumbnail_url,like_count,media_type,shortcode,media_url,comments_count,caption,comments{text,username,replies{text,username}}
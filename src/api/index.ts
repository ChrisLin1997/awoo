const API_KEY = '00942a082b944507982c1e8c2cbba299'

type NewsFormKeys = keyof NewsSubmitForm

export const getNewsListService = (data: NewsSubmitForm) => {
  return new Promise<NewsListRes>((resolve, reject) => {
    const query =  (Object.keys(data) as NewsFormKeys[])
      .filter(item => data[item])
      .map(item => `${item}=${data[item]}`)
      .join('&')
    const url = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&`
    
    fetch(url + query)
      .then(res => res.json())
      .then(res => resolve(res))
  })
}
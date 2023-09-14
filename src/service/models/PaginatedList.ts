import { AxiosResponse } from "axios"

const getLinkPage = (link: string): number => {
  const str = link.split(';')[0].replace(/<|>/g, '')
  const linkUrl = new URL(str)
  return Number(linkUrl.searchParams.get('page'))
}

export class PagenatedList {
  currentPage = 1
  prevPage = 0
  nextPage = 0
  totalPage = 0
  data?: any[] = []
  loading = false

  setPrevNextPage(link: string) {
    if (link) {
      const links = link.split(',')
      
      if (links.length < 2  && links[0]) {
        if (links[0].includes('prev')) {
          this.prevPage = getLinkPage(links[0])
        } else if((links[0].includes('next'))) {
          this.nextPage = getLinkPage(links[0])  
        }
      } else {
        this.prevPage = getLinkPage(links[0])
        this.nextPage = getLinkPage(links[1])
      }
    }
  }

  setTotalPage(resCurrentPage: number) {
    if (this.totalPage) {
      if (this.nextPage && this.nextPage > this.totalPage) {
        this.totalPage = this.nextPage  
      } else if (this.currentPage && this.currentPage > this.totalPage){
        this.totalPage = this.currentPage
      }
    } else {
      if (this.currentPage && this.currentPage > resCurrentPage) {
        this.totalPage = this.currentPage
      } else {
        this.totalPage = resCurrentPage
      }
    }   
  }

  addNextList(pagenatedList: PagenatedList) {
    this.nextPage = pagenatedList.nextPage
    this.totalPage = pagenatedList.totalPage
    if (pagenatedList?.data) this.data?.push(...pagenatedList.data)
    this.loading = false
  }

  async getListfromAxios(axiosRes: AxiosResponse<any, any>) {
    const res = await axiosRes
    const currentPage = Number(res.config.params.page)
    const link = res.headers.link
    
    this.setPrevNextPage(link)
    this.setTotalPage(currentPage)
    this.currentPage = currentPage

    
    this.data?.push(...res.data)
  }
}
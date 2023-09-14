import api from "@/api/imageApi"
import { PagenatedList } from "./models/PaginatedList"

export default {
	async getimageList(page?: number, limit?: number): Promise<PagenatedList>{
		const res = await api.getImageList(page, limit)
		const pagenatedList = new PagenatedList()
		pagenatedList.getListfromAxios(res)
		
		return pagenatedList 
	},
}
import type { AxiosPromise } from "axios"
import httpRequest from "./apiConfig"
import {ImageModel} from "@/service/models/ImageType"

export default {
	getImageList: (page = 1, limit = 15): AxiosPromise<ImageModel[]>=> httpRequest.get('/v2/list', {
		params: {
			page: page,
			limit: limit
		}
	})
}

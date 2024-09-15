export interface ApiResponseInterface {
    message: string,
    status: number,
}

export interface ApiDataResponseInterface extends ApiResponseInterface {
    data?: any | undefined
}

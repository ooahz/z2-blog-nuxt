import {useDefaultRequest} from "./request";
import type {Result} from "@/types/resultInterface";
import type {FriendInterface} from "@/types/friendInterface";

const BASE_URL = "/v1/friends";

export function saveFriendApi(friend: FriendInterface, isUpdate: boolean): Promise<Result<any>> {
    const params = {
        u: isUpdate
    };
    return useDefaultRequest.post<Result<any>>(BASE_URL, friend, params);
}

export function listFriendApi(): Promise<FriendInterface[]> {
    return useDefaultRequest.get<FriendInterface[]>(BASE_URL);
}

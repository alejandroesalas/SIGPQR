import {Program} from "./Program";
import {AttachmentRequest} from "./AttachmentRequest";
import {AttachmentResponse} from "./AttachmentResponse";

export const enum RESP_STATUS_TYPE {
    _onProcess = 2,
    _open = 1,
    _closed = 3
}

export class _Response {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status_response: number,
        public type: string,
        public request_id: number,
        public student_id: number,
        public coordinator_id: number,
        public attachments?: Array<AttachmentResponse>,
        public created_at?: string
    ) {
    }
}

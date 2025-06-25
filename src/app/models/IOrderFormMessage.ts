export interface IOrderFormMessage {
    fullName: string;
    phoneNumber: string;
    messageText: string;
}

export class OrderFormMessage implements IOrderFormMessage {
    fullName: string = '';
    phoneNumber: string = '';
    messageText: string = '';
    constructor(init?: Partial<OrderFormMessage>) {
        Object.assign(this, init);
    }
}

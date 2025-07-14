export interface ISupportAnnouncementListItem {
    id?: number;
    text: string;
}

export class SupportAnnouncementListItem implements ISupportAnnouncementListItem {
    id?: number = undefined;
    text: string = '';
    constructor(init?: Partial<SupportAnnouncementListItem>) {
        Object.assign(this, init);
    }

    reset() {
        this.id = undefined;
        this.text = '';
    }
}
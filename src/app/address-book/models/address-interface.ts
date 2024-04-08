export interface Child {
    _id?: string;
    picture?: string;
    name: {
        first: string;
        last: string;
    };
    company: string;
    email: string;
    phone: string;
    groups?: string[];
    checked?: boolean;
    id: string;
}

export interface Group {
    name: string;
    checked: boolean;
    expandableClosed: boolean;
    id: string;
    childrens: Child[];
}

export interface Email {
    email: string;
}

export interface IDialogData {
    result?: boolean;
    data?: any
}

export interface IEmployee {
    first: string;
    last: string;
}
export interface InvitePayload {
    newInvites: ICounterpartsList | Email[];
}

export interface IGroupList extends Array<Group> { }
export interface ICounterpartsList extends Array<Child> { }

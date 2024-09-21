export interface AuthorInterface {
    readonly id: string;
    name: string;
    siteName: string;
    website: string;
    avatar: string;
    description: string;
    email: string;
    extendsParams: Extends;
}

interface Extends {
    landingImg: string
    github: string;
    footer: string;
    copyright: string;
    icp: string;
    icpLink: string;
}

enum UserType { Zlatni= 1, Srebrni, Bronzani}

export interface Usertype {
    type: UserType;
    discount: number;
    points: number;
}

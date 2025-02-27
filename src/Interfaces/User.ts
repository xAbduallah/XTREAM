export interface IUser {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    userType: string
    isActive: boolean
    isVerified: boolean
    isSeller: boolean
    isVerifiedSeller: boolean
    createdAt: string
    token: string
}

export interface IRequestState {
    success: boolean;
    message: string | null;
    isLoading: boolean;
}

export interface UserState {
    user: IUser | null;
    requestState: Record<string, IRequestState>;
}

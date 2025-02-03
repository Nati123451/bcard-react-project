import { User } from "../interfaces/User";

// App State
export class UsersState {
    public users: User[] = [];
}

// Action Type
export enum UsersActionType {
    CreateUser = "CreateUser",
    UpdateUser = "UpdateUser",
    DeleteUser = "DeleteUser",
    SetAllUsers = "SetAllUsers",
    FilterUsers = "FilterUsers",
}

// Action
export interface UsersAction {
    type: UsersActionType;
    payload: any;
}

// Action Creators
export function addUserAction(user: User): UsersAction {
    return { type: UsersActionType.CreateUser, payload: user };
}

export function updateUserAction(user: User): UsersAction {
    return { type: UsersActionType.UpdateUser, payload: user };
}

export function deleteUserAction(_id: number): UsersAction {
    return { type: UsersActionType.DeleteUser, payload: _id };
}

export function setAllUsersAction(users: User[]): UsersAction {
    return { type: UsersActionType.SetAllUsers, payload: users };
}

export function filterUsersAction(filteredUsers: User[]): UsersAction {
    return { type: UsersActionType.FilterUsers, payload: filteredUsers };
}

// Reducer - שימוש ב-Map לאחסון המשתמשים בצורה יעילה יותר
export function usersReducer(currentState: UsersState = new UsersState(), action: UsersAction): UsersState {
    const newState = { ...currentState };
    const usersMap = new Map(currentState.users.map(user => [user._id, user])); // משתמשים ב-Map לשיפור ביצועים

    switch (action.type) {
        case UsersActionType.CreateUser:
            usersMap.set(action.payload._id, action.payload);
            break;

        case UsersActionType.UpdateUser:
            usersMap.set(action.payload._id, action.payload);
            break;

        case UsersActionType.DeleteUser:
            usersMap.delete(action.payload);
            break;

        case UsersActionType.SetAllUsers:
            usersMap.clear();
            action.payload.forEach(user => usersMap.set(user._id, user));
            break;

        case UsersActionType.FilterUsers:
            newState.users = action.payload;
            break;

        default:
            break;
    }

    newState.users = Array.from(usersMap.values()); // מחזירים את ה-Map לאר array
    return newState;
}


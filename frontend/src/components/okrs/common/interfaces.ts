export interface okrTypes {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    userId: number
}

export interface objectiveTypes {
    id: number,
    name: string,
    skillObjectiveId: number,
    okrId: number,
    result: number
}

export interface keyResultTypes {
    id: number,
    name: string,
    ObjectiveId: number
}

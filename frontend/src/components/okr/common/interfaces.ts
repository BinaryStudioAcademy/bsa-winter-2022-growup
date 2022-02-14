export interface IOkr {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    userId: number
}

export interface IObjective {
    id: number,
    name: string,
    skillObjectiveId: number,
    okrId: number,
    result: number
}

export interface IKeyResult {
    id: number,
    name: string,
    ObjectiveId: number
}

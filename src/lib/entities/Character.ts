enum CharacterAttributeType {
    Scalar,
    Archetype
}

interface CharacterAttribute {
    type: CharacterAttributeType
    scalarValue?: number
}

interface CharacterFeeling {
}

interface CharacterRelation {
}

enum CharacterSex {
    Male,
    Female,
    Other
}

class Character {
    constructor () {

    }

    sex: CharacterSex
    name: string
    age: number
    

    attributes: any[]
    feelings: any[]
    relations: any[]
}
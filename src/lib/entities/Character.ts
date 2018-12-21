/*

Character archetypes:

- student
    - film
    - literature
    - sociology
    - anthropology
    - philosophy
    - journalism
    - marketing
    - law
    - media
    - art
    - 

- work
    - ad agency
    - production company
    - McKinsey
    - KPMG
    - Deloitte
    - 

*/


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
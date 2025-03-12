import { Entity } from "../core/entities/entities"

interface StudentProps {
    name: string
}
export class Student extends Entity<StudentProps> {

}
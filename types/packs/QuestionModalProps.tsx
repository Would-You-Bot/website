import { PackData } from "@/utils/zod/schemas"
import { PackType } from "@prisma/client"
import { Control } from "react-hook-form"

export default interface QuestionModalProps {
    control: Control<PackData>
    type: PackType
    mode: 'create' | 'update'
    questionToEdit: number | null
    isOpen?: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

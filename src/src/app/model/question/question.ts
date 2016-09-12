import {QuestionOptionModel} from './questionOption'
export /**
 * question-model
 */
class QuestionModel {
    question_id: number
    question_description: string
    topic_id:number
    is_multiple_option:boolean
    answer_explanation:string
    created_by:string
    updated_by:string
    created_datetime:string
    updated_datetime:string
    options:Array<QuestionOptionModel>
}

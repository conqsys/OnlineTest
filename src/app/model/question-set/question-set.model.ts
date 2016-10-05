
export /**
 * question-set-model
 */
    class QuestionSetModel {
    question_set_id: number;
    question_set_title: string;
    total_time: string;
    company_id: number;
    total_questions: number;
    is_randomize: boolean;
    option_series: string;
    created_by: string;
    updated_by: string;
    created_datetime: string;
    updated_datetime: string;
    question_set_questions: Array<QuestionSetQuestionsModel>;
}

export /**
 * question-set-questions-model
 */
    class QuestionSetQuestionsModel {
    question_set_question_id: number;
    question_set_id: number;
    question_id: number;
    question_description: string;
    is_deleted: number;
}

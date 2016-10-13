export class OnlineTest {
    online_test_id: number;
    company_id: number;
    online_test_title: string;
    test_start_date: string;
    test_start_time: string;
    test_end_date: string;
    test_end_time: string;
    question_set_id: number;
    test_support_text: string;
    test_experience_years: number;
    created_by: string;
    updated_by: string;
    created_datetime: string;
    updated_datetime: string;

    onlineTestUsers: OnlineTestUser[];
}

export class OnlineTestUser {
    online_test_user_id: number;
    user_id: number;
    online_test_id: number;
    test_completed_date: Date;
    test_start_date_time: string;
    test_end_date_time: string;
    is_abandoned: number;
    is_completed: number;
}

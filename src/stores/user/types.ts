export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

export type UserJobs = Pick<User, 'email' | 'name'> & {
    job_id: number;
    phoneNumber: string;
    coverLetter: string | null;
    cv: string;
};

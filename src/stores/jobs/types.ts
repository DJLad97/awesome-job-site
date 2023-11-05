export type Job = {
    id: number;
    title: string;
    company: string;
    description: string;
};

export type JobApplication = {
    jobId: number;
    name: string;
    email: string;
    phoneNumber: string;
    coverLetter: string;
    cv: string;
};

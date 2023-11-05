import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { Job } from './types';

export const useJobsStore = defineStore(
    'jobs',
    () => {
        const jobs = ref<Array<Job>>([
            {
                id: 1,
                title: 'UI/UX Designer',
                company: 'Design Studio',
                description:
                    'We are looking for a talented UI/UX designer to create visually stunning and user-friendly interfaces for our web and mobile applications. The ideal candidate should have a strong portfolio showcasing their design skills and a deep understanding of user-centered design principles.',
            },
            {
                id: 2,
                title: 'Data Analyst',
                company: 'Data Insights Inc.',
                description:
                    "Join our data analytics team to extract valuable insights from large datasets. You'll work with cutting-edge tools and techniques to analyze data and help our clients make informed decisions. Strong analytical skills and a passion for data-driven insights are essential.",
            },
            {
                id: 3,
                title: 'Marketing Manager',
                company: 'Digital Marketing Pros',
                description:
                    "We're seeking an experienced Marketing Manager to develop and execute marketing strategies. You'll be responsible for creating and managing marketing campaigns, tracking performance, and optimizing our online presence. If you have a strong background in digital marketing, we want to hear from you.",
            },
            {
                id: 4,
                title: 'Mobile App Developer',
                company: 'App Innovators',
                description:
                    'Are you passionate about mobile app development? Join our team and work on exciting projects to create innovative and user-friendly mobile applications. Experience with iOS and Android app development is a must.',
            },
            {
                id: 5,
                title: 'Data Scientist',
                company: 'Data Insights Inc.',
                description:
                    "As a Data Scientist, you'll leverage your skills in machine learning, data analysis, and statistical modeling to solve complex problems. Join our team to work on challenging projects and make a significant impact using data science.",
            },
            {
                id: 6,
                title: 'Content Writer',
                company: 'Content Creators Co.',
                description:
                    "We're looking for a creative and skilled content writer to produce high-quality content for websites, blogs, and marketing materials. If you have a way with words and a passion for storytelling, this role is perfect for you.",
            },
            {
                id: 7,
                title: 'Network Engineer',
                company: 'Tech Solutions Ltd.',
                description:
                    "Join our network engineering team to design, implement, and manage network infrastructure. You'll play a critical role in maintaining the reliability and performance of our network systems. Strong knowledge of networking technologies is required.",
            },
            {
                id: 8,
                title: 'Graphic Designer',
                company: 'Creative Designs Inc.',
                description:
                    "We're seeking a talented Graphic Designer to create visually appealing graphics for various projects. Proficiency in Adobe Creative Suite and a strong design portfolio are essential for this role.",
            },
            {
                id: 9,
                title: 'Software Engineer',
                company: 'Tech Innovations Corp.',
                description:
                    "Join our software engineering team to develop innovative software solutions. You'll work on coding, testing, and debugging software applications and collaborate with cross-functional teams to deliver high-quality software products.",
            },
            {
                id: 10,
                title: 'Product Manager',
                company: 'Product Innovators Ltd.',
                description:
                    "We're looking for a Product Manager to lead the development and strategy of our products. You'll define product roadmaps, work closely with engineering and design teams, and drive product success in the market.",
            },
            {
                id: 11,
                title: 'DevOps Engineer',
                company: 'Cloud Solutions Inc.',
                description:
                    "Join our DevOps team to automate, optimize, and streamline software development and deployment processes. You'll work with cutting-edge DevOps tools and technologies to improve efficiency and reliability.",
            },
            {
                id: 12,
                title: 'Project Manager',
                company: 'Project Management Pros',
                description:
                    "We're seeking an experienced Project Manager to lead and oversee projects from initiation to completion. Strong project management skills and the ability to coordinate project teams are essential.",
            },
            {
                id: 13,
                title: 'Sales Representative',
                company: 'Sales Solutions Inc.',
                description:
                    "Join our sales team to promote and sell our products and services. You'll engage with potential customers, build relationships, and drive sales growth. Excellent communication and persuasion skills are a plus.",
            },
            {
                id: 14,
                title: 'Quality Assurance Tester',
                company: 'QA Innovations Ltd.',
                description:
                    "As a Quality Assurance Tester, you'll be responsible for testing software applications and ensuring they meet quality standards. Attention to detail and a passion for identifying and reporting defects are required.",
            },
            {
                id: 15,
                title: 'AI/Machine Learning Engineer',
                company: 'AI Innovations Corp.',
                description:
                    "Join our AI and Machine Learning team to develop cutting-edge algorithms and models. You'll work on AI-powered solutions and contribute to the advancement of artificial intelligence and machine learning technologies.",
            },
            {
                id: 16,
                title: 'Customer Support Specialist',
                company: 'Support Solutions Inc.',
                description:
                    "We're looking for a Customer Support Specialist to assist customers with inquiries, provide solutions, and ensure a positive customer experience. Strong communication and problem-solving skills are a must.",
            },
            {
                id: 17,
                title: 'Frontend Web Developer',
                company: 'Web Development Co.',
                description:
                    'Join our team as a Frontend Web Developer to create visually appealing and responsive web interfaces. Proficiency in HTML, CSS, and JavaScript is essential, and experience with modern frontend frameworks is a plus.',
            },
            {
                id: 18,
                title: 'Data Engineer',
                company: 'Data Innovations Inc.',
                description:
                    "As a Data Engineer, you'll design and maintain data pipelines and ETL processes. You'll work with big data technologies to ensure the efficient storage and processing of data.",
            },
            {
                id: 19,
                title: 'IT Support Specialist',
                company: 'Tech Support Solutions',
                description:
                    'Join our IT support team to provide technical assistance to end-users and resolve IT-related issues. Strong troubleshooting skills and knowledge of IT systems and software are required.',
            },
        ]);

        const getJobById = computed(() => (id: number) => {
            return jobs.value.find((job) => job.id === id) ?? null;
        });

        return { jobs, getJobById };
    },
    {
        persist: true,
    }
);

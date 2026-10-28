import { ReadyData } from '../../../types/cv';

export const twoColumnReady: ReadyData = {
  en: {
    firstName: 'Marcus',
    lastName: 'Chen',
    jobTitle: 'Senior Cloud & DevOps Architect',
    email: 'marcus.chen@cloudtech.io',
    phone: '+1 415 555 0198',
    location: 'San Francisco, CA, USA',
    address: '742 Market Street, Suite 900',
    nationality: 'American',
    birthDate: '1990-11-05',
    website: 'https://github.com/marcuschen',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    summary:
      'Cloud solutions architect specializing in automated Kubernetes clusters, multi-region AWS/GCP deployments, and secure CI/CD pipelines. Passionate about zero-downtime infrastructure and developer productivity.',
    experience: [
      {
        id: 'exp-1',
        position: 'Lead Infrastructure Architect',
        company: 'Apex Cloud Systems',
        startDate: '2020-04-01',
        endDate: '2024-02-01',
        description:
          'Architected containerized microservices infrastructure supporting 15M+ active users. Cut infrastructure costs by 28% using spot instances and Terraform IaC.',
      },
      {
        id: 'exp-2',
        position: 'DevOps Engineer',
        company: 'Vanguard Data Corp',
        startDate: '2016-08-01',
        endDate: '2020-03-15',
        description:
          'Migrated legacy monolithic systems to Kubernetes on AWS EKS. Designed automated Jenkins and GitLab CI pipelines.',
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        startDate: '2012-09-01',
        endDate: '2016-05-30',
        description: 'Focus on Distributed Systems, Cloud Networking, and Operating Systems.',
      },
    ],
    skills: ['Kubernetes', 'Docker', 'AWS & GCP', 'Terraform', 'CI/CD Pipelines', 'Python', 'Go', 'Linux'],
    languages: [
      { id: 'lang-1', name: 'English', level: 'Native / Bilingual' },
      { id: 'lang-2', name: 'Mandarin', level: 'Native / Bilingual' },
      { id: 'lang-3', name: 'Spanish', level: 'B2 - Upper Intermediate' },
    ],
  },
  ka: {
    firstName: 'მარკუს',
    lastName: 'ჩენი',
    jobTitle: 'Cloud & DevOps წამყვანი ინჟინერი',
    email: 'marcus.chen@cloudtech.io',
    phone: '+1 415 555 0198',
    location: 'სან-ფრანცისკო, აშშ',
    address: 'მარკეტ სტრიტი 742',
    nationality: 'ამერიკელი',
    birthDate: '1990-11-05',
    website: 'https://github.com/marcuschen',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    summary:
      'Cloud არქიტექტორი Kubernetes კლასტერების ავტომატიზაციისა და მასშტაბური AWS/GCP ინფრასტრუქტურის მიმართულებით. ნულოვანი შეფერხების CI/CD სისტემების შექმნის გამოცდილებით.',
    experience: [
      {
        id: 'exp-1',
        position: 'Lead Infrastructure Architect',
        company: 'Apex Cloud Systems',
        startDate: '2020-04-01',
        endDate: '2024-02-01',
        description:
          'შევქმენი მიკროსერვისების ინფრასტრუქტურა 15 მილიონზე მეტი მომხმარებლისთვის. შევამცირე ხარჯები 28%-ით Terraform IaC-ის საშუალებით.',
      },
      {
        id: 'exp-2',
        position: 'DevOps Engineer',
        company: 'Vanguard Data Corp',
        startDate: '2016-08-01',
        endDate: '2020-03-15',
        description:
          'განვახორციელე მონოლითური სისტემების მიგრაცია Kubernetes-ზე (AWS EKS). შევიმუშავე ავტომატური CI/CD пайпლაინები.',
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'კალიფორნიის უნივერსიტეტი, ბერკლი (UC Berkeley)',
        degree: 'ბაკალავრი კომპიუტერულ მეცნიერებებში',
        startDate: '2012-09-01',
        endDate: '2016-05-30',
        description: 'განაწილებული სისტემები და ოპერაციული სისტემები.',
      },
    ],
    skills: ['Kubernetes', 'Docker', 'AWS & GCP', 'Terraform', 'CI/CD Pipelines', 'Python', 'Go', 'Linux'],
    languages: [
      { id: 'lang-1', name: 'ინგლისური', level: 'მშობლიური / თავისუფლად' },
      { id: 'lang-2', name: 'ჩინური (მანდარინი)', level: 'მშობლიური / თავისუფლად' },
      { id: 'lang-3', name: 'ესპანური', level: 'B2 - მაღალი საშუალო' },
    ],
  },
  ru: {
    firstName: 'Маркус',
    lastName: 'Чен',
    jobTitle: 'Ведущий Cloud & DevOps архитектор',
    email: 'marcus.chen@cloudtech.io',
    phone: '+1 415 555 0198',
    location: 'Сан-Франциско, США',
    address: 'Маркет-стрит 742',
    nationality: 'Американец',
    birthDate: '1990-11-05',
    website: 'https://github.com/marcuschen',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    summary:
      'Архитектор облачных решений с глубоким опытом в автоматизации кластеров Kubernetes, развертывании в AWS/GCP и построении отказоустойчивых CI/CD систем.',
    experience: [
      {
        id: 'exp-1',
        position: 'Lead Infrastructure Architect',
        company: 'Apex Cloud Systems',
        startDate: '2020-04-01',
        endDate: '2024-02-01',
        description:
          'Спроектировал микросервисную инфраструктуру для 15M+ пользователей. Снизил затраты на облако на 28% благодаря Terraform IaC и spot-инстансам.',
      },
      {
        id: 'exp-2',
        position: 'DevOps Engineer',
        company: 'Vanguard Data Corp',
        startDate: '2016-08-01',
        endDate: '2020-03-15',
        description:
          'Миграция монолитных систем в Kubernetes на AWS EKS. Построение автоматических пайплайнов в Jenkins и GitLab CI.',
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'Калифорнийский университет в Беркли (UC Berkeley)',
        degree: 'Бакалавр компьютерных наук',
        startDate: '2012-09-01',
        endDate: '2016-05-30',
        description: 'Распределенные системы, облачные сети и безопасность.',
      },
    ],
    skills: ['Kubernetes', 'Docker', 'AWS & GCP', 'Terraform', 'CI/CD Pipelines', 'Python', 'Go', 'Linux'],
    languages: [
      { id: 'lang-1', name: 'Английский', level: 'Родной / Свободно' },
      { id: 'lang-2', name: 'Китайский (Мандарин)', level: 'Родной / Свободно' },
      { id: 'lang-3', name: 'Испанский', level: 'B2 - Выше среднего' },
    ],
  },
};

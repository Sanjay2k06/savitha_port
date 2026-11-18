import React from 'react'

const SERVICES = [
  {
    title: 'Technical Skills',
    body:
      'Python, C Programming, C++ Programming, HTML, CSS, React, FastAPI, Microsoft Office, and Computer Applications.',
  },
  {
    title: 'Education',
    body:
      'B.E. in Computer Science and Engineering — Anand Institute of Higher Technology (CGPA: 9.03/10).',
  },
  {
    title: 'Certifications',
    body:
      'Python Programming (2025), C Programming (2024), C++ Programming (2024), MS Office & Applications (2022) — CTC Computer Education Center.',
  },
  {
    title: 'Key Focus Areas',
    body:
      'Software Development, Real-World Problem Solving, AI-Powered Healthcare Systems, Responsive Web Applications, and Continuous Learning.',
  },
];

const SubHeader = () => {
  return (
    <div className='w-full flex flex-col items-start text-left px-4 md:px-0'>
      <div className='w-full text-base md:text-lg lg:text-xl flex flex-col gap-3 md:gap-4 leading-relaxed text-left'>
        <p>
          Hi, I&apos;m Savitha Balaji, a motivated and adaptable Computer Science and Engineering student with a strong interest in technology, software development, and continuous learning.
        </p>
        <p>
          Eager to apply academic knowledge to real-world challenges and develop practical, industry-relevant skills. Strong foundation in Python, C, and C++, with additional knowledge of Microsoft Office tools. Passionate about exploring new technologies, improving problem-solving abilities, and building practical solutions through hands-on learning.
        </p>
      </div>

      <div className='about-inline-services w-full mt-8 md:mt-12 h-auto'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>CORE EXPERTISE</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((service) => (
            <article key={service.title} className='about-inline-services__item'>
              <h4>{service.title}</h4>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubHeader

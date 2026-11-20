import { NextResponse } from 'next/server';
import { insert } from '@/../backend/database/db.js';
import { saveUploadFile } from '@/../backend/helpers/upload.js';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const address = formData.get('address') || '';
    const year_of_experience = formData.get('year_of_experience') || '';
    const career_id = formData.get('career_id') ? Number(formData.get('career_id')) : null;
    const contact_number = formData.get('contact_number') || formData.get('phone') || '';
    const skills = formData.get('skills') || '';
    const project_link = formData.get('project_link') || '';
    const message = formData.get('message') || '';
    const resumeFile = formData.get('resume');

    let resumePath = null;
    if (resumeFile && typeof resumeFile !== 'string' && resumeFile.size > 0) {
      resumePath = await saveUploadFile(resumeFile, 'assets/resumes', `resume-${name}`);
    }

    const id = await insert('careerform', {
      name,
      email,
      address,
      year_of_experience,
      career_id,
      resume: resumePath,
      contact_number,
      skills,
      project_link,
      message,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({
      status: true,
      message: 'Application submitted successfully',
      id,
    });
  } catch (error) {
    console.error('career_form error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

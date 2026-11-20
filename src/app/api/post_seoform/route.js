import { NextResponse } from 'next/server';
import { insert } from '@/../backend/database/db.js';

export async function POST(req) {
  try {
    let body;
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    }

    const { name, website_url, email, current_traffic, message, button } = body;

    const id = await insert('seo_forms', {
      name: name || '',
      website_url: website_url || '',
      email: email || '',
      current_traffic: current_traffic || '',
      message: message || '',
      button: button || 'Submit',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({
      status: true,
      message: 'SEO form submitted successfully',
      id,
    });
  } catch (error) {
    console.error('post_seoform error:', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

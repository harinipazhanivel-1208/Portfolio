# 🌐 AWS Static Portfolio Website Deployment

## 📌 Project Overview
This project focuses on building and deploying my personal portfolio website using AWS cloud services.  
The website showcases my skills, certifications, projects, and contact information with a simple, responsive, and professional design.  
It is hosted as a static website on Amazon S3 and delivered globally using Amazon CloudFront for better performance and security.

---

## 🏗️ Architecture Used
- Amazon S3 – Static website hosting
- Amazon CloudFront – Global content delivery (CDN)
- HTML, CSS, JavaScript - Frontend development

---

## 🚀 Project Implementation Steps

### 1️⃣ Website Development
- Designed a responsive portfolio website using HTML, CSS, and JavaScript
- Included the following sections:
  - About Me
  - Skills
  - Certifications
  - Projects
  - Contact Details

---

### 2️⃣ Amazon S3 Static Website Hosting
- Created an S3 bucket with a unique name
- Enabled Static Website Hosting
- Uploaded all website files (index.html, CSS, JavaScript, assets)
- Configured bucket policy to allow public read access for the S3 website endpoint

---

### 3️⃣ CloudFront Distribution Setup
- Created an Amazon CloudFront distribution
- Configured the S3 bucket as the origin
- Enabled Origin Access Control (OAC) for secure access
- Restricted direct S3 access and allowed access only through CloudFront
- Enabled caching for faster content delivery

---

## ✅ Project Outcomes
- Successfully hosted a serverless static website
- Improved performance using CloudFront CDN
- Implemented secure access control between S3 and CloudFront
- Gained hands-on experience with AWS cloud services

---

## 📎 Live Website Links
- **S3 Website (Origin):**  
  [View Link](http://harinipazhanivel-portfolio.s3-website-us-east-1.amazonaws.com)
- **CloudFront URL:**  
  [View Link](http://d2ct48zavirkby.cloudfront.net)
---  
## Skills Gained
- AWS S3 Static Website Hosting
- Cloudfront CDN Configuration
- S3 Bucket Policies & Origin Access Control (OAC)
- Cloud Security Fundamentals
- Frontend Deployment on AWS

Author Harini Pazhanivel

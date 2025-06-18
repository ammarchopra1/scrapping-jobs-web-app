from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from models.job import Job
from config.db import SessionLocal

from datetime import datetime, timedelta

session=SessionLocal()

def parse_relative_date(relative_str):
    try:
        days_ago = int(relative_str.strip().replace('d ago', '').strip())
        return (datetime.utcnow() - timedelta(days=days_ago)).date()
    except:
        return datetime.utcnow().date()  # fallback to today



# Correct URL and path
website = 'https://www.actuarylist.com'
path = r"C:\Users\Ammar Chopra\Desktop\web-app project\chromedriver-win64\chromedriver.exe"

# Set up service and driver
service = Service(path)
driver = webdriver.Chrome(service=service)

# Open the website
driver.get(website)

# 🔴 Add delay to wait for content to load
time.sleep(5)


# Now locate and extract
i=1
jobs_to_add=[]
while True:
    print("the page number is =",i)
    job_cards = driver.find_elements(By.CLASS_NAME, "Job_job-card__YgDAV")

    for job_card in job_cards:
        job_title = job_card.find_element(By.CLASS_NAME, "Job_job-card__position__ic1rc").text
        job_company = job_card.find_element(By.CLASS_NAME, "Job_job-card__company__7T9qY").text
        job_posted = job_card.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ").text
        job_country = job_card.find_element(By.CLASS_NAME, "Job_job-card__country__GRVhK").text
        job_tags = job_card.find_element(By.CLASS_NAME, "Job_job-card__tags__zfriA").text
        posting_date = parse_relative_date(job_posted)

        job_type = "Full-time"
        # print(f"📌 Title: {job_title}\n🏢 Company: {job_company}\n📅 Posted: {posting_date}\n🌍 Country: {job_country}\n🏷️ Tags: {job_tags}\n🕒 Type: {job_type}\n{'-'*50}")

       
        job=Job(
            title=job_title,
            company=job_company,
            posting_date=posting_date,
            job_type=job_type,
            location=job_country,
            tags=job_tags,
        )
        existing_job = session.query(Job).filter_by(title=job_title, company=job_company, posting_date=posting_date).first()
        if existing_job:
            print(f"Job already exists: {job_title} at {job_company} on {posting_date}. Skipping...")
            continue
           
        else:
            print("the job data is",job)
            session.add(job)
            session.commit()
            # driver.quit()
            # exit()
       

        

           


    try:
        next_button=driver.find_element(By.XPATH, "//button[contains(text(), 'Next')]")
        next_button.click()
        time.sleep(10)
        # i=i+1
        # if(i==3):
        #     break
    except:
        print("no more pages")
        break
    
    




# Wait to see the result before closing
input("Press Enter to close the browser...")

# Print page title
print("Page title:", driver.title)

# Close the browser
driver.quit()

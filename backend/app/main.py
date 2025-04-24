from typing import Optional
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests

load_dotenv()
OLLAMA_URI = os.getenv("OLLAMA_URI")
app = FastAPI()

model = 'llama3.1:8b-instruct-fp16'
temperature = 0.1

prompt_template = '''---Goal---  
### **Objective**  
- **Organize** the provided medical record into a **clear, structured, and well-formatted Markdown document**.  
- Maintain **concise formatting** while **preserving all details** without modification, rephrasing, or omission.  
- **Conservatively assess** whether neuropathic pain is present based on the medical record and provide a description.  
  
### **Formatting Guidelines**  
- Use **headings, bullet points, and tables** for readability.  
- **Correct only grammatical or vocabulary errors** when necessary.  
- Ensure **medication details** (dosage, frequency, units) are clearly presented.  
- Convert any **Minguo calendar (ROC year) dates** to the **Gregorian calendar (YYYY-MM-DD)** format.  
- If the original text does not mention a year, do not include a year in the output.  
- Do not infer or add any missing information that is not explicitly provided in the input.  
  
### **Neuropathic Pain Assessment**  
- **Explicitly stated?** → Mark as "**Neuropathic pain: `Describe`.**"  
- **Not explicitly stated?** → Mark as "**Neuropathic pain: Not explicitly indicated.**"  
- **Conservative inference based on symptoms?** → Mark as "**Neuropathic pain: Possible, based on `symptoms`**."    
- **Use a conservative approach** when evaluating descriptions of pain.  
  
### **Output Requirements**  
- Ensure **structured Markdown formatting** for clarity and easy readability.  
- Use **sections and subheadings** where appropriate.  
- Avoid any **unnecessary modifications** beyond formatting and error corrections.  
- If the input is a question unrelated to medicine, refuse to answer.  
  
  
---Examples---  
**Input: **  
```  
Dear Dr,The 70-year-old male past history of HCC,HBV-related,S7,s/p TACE (2017/2/15),with suspected retroperitoneal LN mets,under Sorafenib(2018/09~)and palliative R/T has been completed.He also had underlying disease of type 2 DM,CKD,HTN,CAD III s/p Off-pump CABG 4,COPD.This time due to he still suffered from exertional dyspnea for several days and intermittent abdominal fullness with dull pain sensation and frequent hiccup.Lab data revealed liver and kidney function impairment.Thus he was admitted for further treatment.He complains abdominal pain and malaise.we sincerely your expertise to evaluation pain control and promotes comfort.Thank you very much.  
```  
  
**Output: **  
```  
# **Patient Summary: 70-Year-Old Male**  
  
## **Patient Information**  
- **Medical History:**  
  - **Hepatocellular Carcinoma (HCC)** – Hepatitis B Virus (HBV)-related  
  - **History of Treatment:**  
    - **Transarterial Chemoembolization (TACE):** Performed on **2017-02-15**  
    - **Suspected Retroperitoneal Lymph Node (LN) Metastases**  
    - **Sorafenib Therapy:** Started in **2018-09**  
    - **Completed Palliative Radiotherapy (R/T)**  
  - **Underlying Conditions:**  
    - **Type 2 Diabetes Mellitus (DM)**  
    - **Chronic Kidney Disease (CKD)**  
    - **Hypertension (HTN)**  
    - **Coronary Artery Disease (CAD) (Stage III)** – **Status Post (s/p) Off-pump Coronary Artery Bypass Grafting (CABG) x4**  
    - **Chronic Obstructive Pulmonary Disease (COPD)**  
  
## **Current Condition & Symptoms**  
- **Chief Complaints:**  
  - **Exertional dyspnea** persisting for several days  
  - **Intermittent abdominal fullness with dull pain sensation**  
  - **Frequent hiccups**  
- **Laboratory Findings:**  
  - **Liver and kidney function impairment** detected  
  
## **Assessment**  
- Patient complains abdominal pain and malaise.
- We sincerely request your expertise in **pain control** and **comfort promotion** for the patient.  
  
## **Neuropathic Pain Evaluation**  
- **Neuropathic Pain:** **Not explicitly indicated**  
```

--- Medical record ---
{medical_record}
'''


@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI!"}

        

@app.post("/api/llama")
async def call_ollama(
    text: Optional[str] = Form(None), images: Optional[UploadFile] = File(None)
):
    messages = [
            {
                "role": "system",
                "content": f"You are a helpful AI assistant. Please follow the instructions below."
            },
            {
                "role": "user",
                "content": prompt_template.format(medical_record=text)
            }
        ]
    try:
        url = f"{OLLAMA_URI}/api/chat"
        
        response = requests.post(
            url,
            json={
                "model":  model, 
                "messages": messages,
                "stream": False,
                "temperature": temperature
            },
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Ollama API error: {response.text}"
            )
        else: 
            json_response = response.json()
            return json_response['message']['content']
        
    except HTTPException as http_exc:
        raise http_exc 

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error calling Ollama API: {str(e)}"
        )


import os
import requests
import json
import openai



def askGpt(promptt, system):
    openai.api_key = os.getenv("AZURE_OPENAI_KEY")
    openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
    openai.api_type = 'azure'
    openai.api_version = '2023-05-15' 

   
    response=openai.ChatCompletion.create(
    engine='NutrixLive',
    messages=[
        {"role": "system", "content": system},
        {
            "role" : "user", "content":str(promptt)}
    ],
    max_tokens=2048,  # Limit the response to a certain number of tokens
    stop=None,  # Let the assistant decide when to stop generating
    temperature=0.0,  # Use deterministic output
    n=1  # Generate a single response
    
   )
    return response['choices'][0]['message']['content']








# prompt= str( "Create a personalized Individualized Meal Plan Document that is tailored to the user's unique situation. Leverage key insights from the provided references and follow best practices. Create An Individualized Meal Plan Document , As a dietitian in the medical department, your task is to create an individualized meal plan document for patients based on their medical conditions, dietary preferences, and nutritional needs. The finished work will be used by the patients to follow a healthy and balanced diet that meets their specific requirements. The core success factors for this task are accuracy, attention to detail and ensure that their needs and preferences are taken into account. The meal plan document should be easy to understand and follow, and it should provide clear instructions on portion sizes, meal timings, and food choices. The impact of this task is significant as it can help patients manage their medical conditions, improve their overall health and wellbeing, and prevent complications related to poor nutrition. Use these references to create an individualized meal plan document . references :[{ title :Nutrition Therapy and Pathophysiology , author : Marcia Nelms, Kathryn P. Sucher, Sara Long Roth ,year : 2015 , keyInsights :[ Assessing the nutritional status of patients is essential for creating individualized meal plans that meet their specific needs. Consider the patient's medical conditions, dietary preferences, and lifestyle factors when creating a meal plan. , Provide clear instructions on portion sizes, meal timings, and food choices to ensure that the patient can understand and follow the plan effectively. ]},{ title : The Complete Idiot's Guide to Total Nutrition , author : Joy Bauer , year : 2005 ,  keyInsights :[ Use a variety of foods to ensure that the patient receives all the necessary nutrients. , Incorporate healthy fats, lean proteins, and complex carbohydrates into the meal plan. Encourage the patient to make gradual changes to their eating habits to ensure long-term success. ]},{ title : The Food Medic for Life: Easy recipes to help you live well every day , author : Dr. Hazel Wallac , year :2019 ,  keyInsights :[ Provide patients with simple and easy-to-follow recipes that align with their meal plan. Consider the patient's cultural background and food preferences when creating the meal plan. Encourage the patient to keep a food diary to track their progress and identify areas for improvement.]}], criteria :[{ name :    Accuracy ,description : The meal plan document accurately reflects the patient's medical conditions, dietary preferences, and nutritional needs. It provides the correct information on portion sizes, meal timings, and food choices. },{ name : Attention to detail , description : The meal plan document includes all necessary details and instructions for the patient to follow a healthy and balanced diet. It covers specific dietary requirements, potential food allergies or intolerances, and any restrictions or limitations.  Create a personalized nutrition plan in the following format based on the number of meals , for example if you were to provide 3 meals they should be in the following format : 1) Breakfast: \n - [Breakfast Item 1] \n   - [Sub-bullet 1]   \n - [Sub-bullet 2] \n- [Breakfast Item 2]\n- [Sub-bullet 1] \n- [Sub-bullet 2]\n 2) Lunch:\n- [Lunch Item 1]     \n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Lunch Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n 3) Dinner:\n- [Dinner Item 1]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Dinner Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2] \n Calculate the BMR for a male and Create a personalized meal based on the following data :  age = 20 , weight = 90, height =191,he has allergies : fish , so exclude any ingredients containing fish ,his activity dynamic is sedeantry ,he wants 3 meals per day and the desired weight is to be 80")

# prompt = "Create a personalized Individualized Meal Plan that is tailored to the my unique situation. Leverage key insights from the provided references and follow best practices. your task is to create an individualized meal plan based on my medical conditions, dietary preferences, and nutritional needs. The finished work will be used to follow a healthy and balanced diet that meets my specific requirements. The core success factors for this task are accuracy, attention to detail and ensure that the needs and preferences are taken into account. The meal plan should be easy to understand and follow, and it should provide clear instructions on portion sizes and food choices. Output the meal in this format based on the number of meals , for example if you were to provide 3 meals they should be in the following format : 1) Breakfast: \n - [Breakfast Item 1] \n   - [Sub-bullet 1]   \n - [Sub-bullet 2] \n- [Breakfast Item 2]\n- [Sub-bullet 1] \n- [Sub-bullet 2]\n 2) Lunch:\n- [Lunch Item 1]     \n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Lunch Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n 3) Dinner:\n- [Dinner Item 1]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Dinner Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2] \n --- use these refernces :[{ title : Precision Nutrition: A Guide to Personalizing Your Approach for Ultimate Results , author : John Berardi , year : 2018 , keyInsights :[ The book provides actionable advice on how to create personalized nutrition plans based on individual goals, body composition, and training regimen. , It emphasizes the importance of tracking progress and making adjustments to the plan as needed. , The book also includes practical tips for meal planning and preparation, as well as strategies for overcoming common obstacles to healthy eating. :[{ title :Nutrition Therapy and Pathophysiology , author : Marcia Nelms, Kathryn P. Sucher, Sara Long Roth ,year : 2015 , keyInsights :[ Assessing the nutritional status of patients is essential for creating individualized meal plans that meet their specific needs. Consider the patient's medical conditions, dietary preferences, and lifestyle factors when creating a meal plan. , Provide clear instructions on portion sizes, meal timings, and food choices to ensure that the patient can understand and follow the plan effectively. ]},{ title : The Complete Idiot's Guide to Total Nutrition , author : Joy Bauer , year : 2005 ,  keyInsights :[ Use a variety of foods to ensure that the patient receives all the necessary nutrients. , Incorporate healthy fats, lean proteins, and complex carbohydrates into the meal plan. Encourage the patient to make gradual changes to their eating habits to ensure long-term success. ]},{ title : The Food Medic for Life: Easy recipes to help you live well every day , author : Dr. Hazel Wallac , year :2019 ,  keyInsights :[ Provide patients with simple and easy-to-follow recipes that align with their meal plan. Consider the patient's cultural background and food preferences when creating the meal plan. Encourage the patient to keep a food diary to track their progress and identify areas for improvement.]}.  Create a personalized meal containing clear instructions on portion sizes for a male based on the following data :  age = 20 , weight = 90, height =191,he has allergies : fish , so exclude any ingredients containing fish , activity dynamic is sedeantry ,he wants 3 meals per day and the desired weight is to be 80. Limit your answer to the bulleted meal plan only"  
# print(askGpt(prompt))
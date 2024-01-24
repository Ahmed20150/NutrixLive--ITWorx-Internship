from django.shortcuts import render
import os
import sys
import json
import users.models
import datetime
from django.http import HttpResponse
import openai
import nutritionTab.models as nutri
import OpenAI
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed
from django.core.exceptions import ObjectDoesNotExist


@csrf_exempt
def CreateNutriPlan(request):
    system = "You are a nutritionist helping a user create a nutrition plan."
    data = json.loads(request.body)
    user = users.models.Users.objects.get(email=data["email"])

    try:
        newP = nutri.Nutrition.objects.get(email=data["email"])

        date = user.date_of_birth
        date2 = date.split("-")
        curDate = datetime.date.today()

        year, month, day = curDate.year, curDate.month, curDate.day
        age = year - int(date2[0])

        if int(date2[1]) > month:
            age = age - 1

        print(age)
        age = str(age)

        gender = user.gender
        if gender == "male":
            g = "he"
            h = "his"
        else:
            g = "she"
            h = "her"

        print(h)

        height = str(data["height"])
        weight = str(data["weight"])
        activity = str(data["activity"])
        allergies = str(data["allergies"])
        noMeals = str(data["noMeals"])
        desiredWeight = str(data["desiredWeight"])
        favProtein = str(data["favProtein"])
        dislikes = str(data["dislikes"])

        promptStr = str(
            "Create a personalized Individualized Meal Plan that is tailored to the my unique situation. Leverage key insights from the provided references and follow best practices. your task is to create an individualized meal plan based on my medical conditions, dietary preferences, and nutritional needs. The finished work will be used to follow a healthy and balanced diet that meets my specific requirements. The core success factors for this task are accuracy, attention to detail and ensure that the needs and preferences are taken into account. The meal plan should be easy to understand and follow, and it should provide clear instructions on portion sizes ,food choices and macronutrients for each meal, and also specify the exact calories each meal provides , along with the total calories of the whole plan . Output the meal in this format based on the number of meals , for example if you were to provide 3 meals they should be in the following format : 1) Breakfast: \n - [Breakfast Item 1] \n   - [Sub-bullet 1]   \n - [Sub-bullet 2] \n- [Breakfast Item 2]\n- [Sub-bullet 1] \n- [Sub-bullet 2]\n 2) Lunch:\n- [Lunch Item 1]     \n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Lunch Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n 3) Dinner:\n- [Dinner Item 1]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Dinner Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2] \n --- use these references :[{ title : Precision Nutrition: A Guide to Personalizing Your Approach for Ultimate Results , author : John Berardi , year : 2018 , keyInsights :[ The book provides actionable advice on how to create personalized nutrition plans based on individual goals, body composition, and training regimen. , It emphasizes the importance of tracking progress and making adjustments to the plan as needed. , The book also includes practical tips for meal planning and preparation, as well as strategies for overcoming common obstacles to healthy eating. :[{ title :Nutrition Therapy and Pathophysiology , author : Marcia Nelms, Kathryn P. Sucher, Sara Long Roth ,year : 2015 , keyInsights :[ Assessing the nutritional status of patients is essential for creating individualized meal plans that meet their specific needs. Consider the patient's medical conditions, dietary preferences, and lifestyle factors when creating a meal plan. , Provide clear instructions on portion sizes, meal timings, and food choices to ensure that the patient can understand and follow the plan effectively. ]},{ title : The Complete Idiot's Guide to Total Nutrition , author : Joy Bauer , year : 2005 ,  keyInsights :[ Use a variety of foods to ensure that the patient receives all the necessary nutrients. , Incorporate healthy fats, lean proteins, and complex carbohydrates into the meal plan. Encourage the patient to make gradual changes to their eating habits to ensure long-term success. ]},{ title : The Food Medic for Life: Easy recipes to help you live well every day , author : Dr. Hazel Wallac , year :2019 ,  keyInsights :[ Provide patients with simple and easy-to-follow recipes that align with their meal plan. Consider the patient's cultural background and food preferences when creating the meal plan. Encourage the patient to keep a food diary to track their progress and identify areas for improvement.]}.  Create a personalized meal containing clear instructions on portion sizes in grams and milliliters and include macronutrients for each meal and the exact calories for each meal for a "
            + gender
            + " based on the following data :  age = "
            + age
            + " , weight = "
            + weight
            + ", height ="
            + height
            + ",he has allergies : "
            + allergies
            + " , so exclude any ingredients containing "
            + allergies
            + " , activity dynamic is "
            + activity
            + " ,"
            + g
            + " wants "
            + noMeals
            + " meals per day so create a plan that consists of "
            + noMeals
            + " meals per week and the desired weight is to be "
            + desiredWeight
            + ", "
            + h
            + " favorite source of protein is"
            + favProtein
            + " and "
            + h
            + " dislikes are :"
            + dislikes
            + ", so exclude any ingredients containing "
            + dislikes
            + ". Limit your answer to the bulleted meal plan only"
        )

        newPlan = OpenAI.askGpt(promptStr, system)
        newPlan = htmlTransformer(newPlan)
        res = {
            "message": str(newPlan),
        }

        newP.plan = newPlan
        newP.save()
        return HttpResponse(
            json.dumps(res), content_type="application/json", status=200
        )

    except ObjectDoesNotExist:
        date = user.date_of_birth
        date2 = date.split("-")
        curDate = datetime.date.today()

        year, month, day = curDate.year, curDate.month, curDate.day
        age = year - int(date2[0])

        if int(date2[1]) > month:
            age = age - 1

        print(age)
        age = str(age)

        gender = user.gender
        if gender == "male":
            g = "he"
            h = "his"
        else:
            g = "she"
            h = "her"

        height = str(data["height"])
        weight = str(data["weight"])
        activity = str(data["activity"])
        allergies = str(data["allergies"])
        noMeals = str(data["noMeals"])
        desiredWeight = str(data["desiredWeight"])
        dislikes = str(data["dislikes"])
        favProtein = str(data["favProtein"])

        promptStr = str(
            "Create a personalized Individualized Meal Plan that is tailored to the my unique situation. Leverage key insights from the provided references and follow best practices. your task is to create an individualized meal plan based on my medical conditions, dietary preferences, and nutritional needs. The finished work will be used to follow a healthy and balanced diet that meets my specific requirements. The core success factors for this task are accuracy, attention to detail and ensure that the needs and preferences are taken into account. The meal plan should be easy to understand and follow, and it should provide clear instructions on portion sizes ,food choices and macronutrients for each meal, and also specify the exact calories each meal provides , along with the total calories of the whole plan . Output the meal in this format based on the number of meals , for example if you were to provide 3 meals they should be in the following format : 1) Breakfast: \n - [Breakfast Item 1] \n   - [Sub-bullet 1]   \n - [Sub-bullet 2] \n- [Breakfast Item 2]\n- [Sub-bullet 1] \n- [Sub-bullet 2]\n 2) Lunch:\n- [Lunch Item 1]     \n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Lunch Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n 3) Dinner:\n- [Dinner Item 1]\n- [Sub-bullet 1]\n- [Sub-bullet 2]\n- [Dinner Item 2]\n- [Sub-bullet 1]\n- [Sub-bullet 2] \n --- use these references :[{ title : Precision Nutrition: A Guide to Personalizing Your Approach for Ultimate Results , author : John Berardi , year : 2018 , keyInsights :[ The book provides actionable advice on how to create personalized nutrition plans based on individual goals, body composition, and training regimen. , It emphasizes the importance of tracking progress and making adjustments to the plan as needed. , The book also includes practical tips for meal planning and preparation, as well as strategies for overcoming common obstacles to healthy eating. :[{ title :Nutrition Therapy and Pathophysiology , author : Marcia Nelms, Kathryn P. Sucher, Sara Long Roth ,year : 2015 , keyInsights :[ Assessing the nutritional status of patients is essential for creating individualized meal plans that meet their specific needs. Consider the patient's medical conditions, dietary preferences, and lifestyle factors when creating a meal plan. , Provide clear instructions on portion sizes, meal timings, and food choices to ensure that the patient can understand and follow the plan effectively. ]},{ title : The Complete Idiot's Guide to Total Nutrition , author : Joy Bauer , year : 2005 ,  keyInsights :[ Use a variety of foods to ensure that the patient receives all the necessary nutrients. , Incorporate healthy fats, lean proteins, and complex carbohydrates into the meal plan. Encourage the patient to make gradual changes to their eating habits to ensure long-term success. ]},{ title : The Food Medic for Life: Easy recipes to help you live well every day , author : Dr. Hazel Wallac , year :2019 ,  keyInsights :[ Provide patients with simple and easy-to-follow recipes that align with their meal plan. Consider the patient's cultural background and food preferences when creating the meal plan. Encourage the patient to keep a food diary to track their progress and identify areas for improvement.]}.  Create a personalized meal containing clear instructions on portion sizes in grams and milliliters and include macronutrients for each meal and the exact calories for each meal for a "
            + gender
            + " based on the following data :  age = "
            + age
            + " , weight = "
            + weight
            + ", height ="
            + height
            + ",he has allergies : "
            + allergies
            + " , so exclude any ingredients containing "
            + allergies
            + " , activity dynamic is "
            + activity
            + " ,"
            + g
            + " wants "
            + noMeals
            + " meals per day so create a plan that consists of "
            + noMeals
            + " meals per week and the desired weight is to be "
            + desiredWeight
            + ", "
            + h
            + " favorite source of protein is"
            + favProtein
            + " and "
            + h
            + " dislikes are :"
            + dislikes
            + ", so exclude any ingredients containing "
            + dislikes
            + ". Limit your answer to the bulleted meal plan only"
        )

        newPlan = OpenAI.askGpt(promptStr, system)
        newPlan = htmlTransformer(newPlan)
        res = {
            "message": str(newPlan),
        }

        newP = nutri.Nutrition.objects.create(
            plan=newPlan,
            email=data["email"],
        )
        return HttpResponse(
            json.dumps(res), content_type="application/json", status=200
        )

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        response = {"message": str(exc_tb.tb_lineno)}
        return HttpResponse(
            json.dumps(response), content_type="application/json", status=200
        )


@csrf_exempt
def DisplayPlan(request):
    try:
        data = json.loads(request.body)
        exist = nutri.Nutrition.objects.get(email=data["email"])

        plan = {
            "message": str(exist.plan),
        }

        return HttpResponse(
            json.dumps(plan), content_type="application/json", status=200
        )

    except Exception as e:
        response = {
            "message": "firstTime",
        }
        print(str(e))
        return HttpResponse(
            json.dumps(response), content_type="application/json", status=200
        )


@csrf_exempt
def FollowUp(request):
    data = json.loads(request.body)
    newP = nutri.Nutrition.objects.get(email=data["email"])
    system = "You are a nutritionist helping a user create a nutrition plan."
    oldPlan = str(data["oldPlan"])
    comment = str(data["comment"])
    promptStr = (
        "Enhance this plan according to the user's comment, the plan is :"
        + oldPlan
        + " The user's comment is : "
        + comment
        + ". Display the whole plan again with the enhancement"
    )

    newPlan = OpenAI.askGpt(promptStr, system)

    res = {
        "message": str(newPlan),
    }

    newP.plan = newPlan
    newP.save()
    return HttpResponse(json.dumps(res), content_type="application/json", status=200)


def htmlTransformer(s):
    s = str(s)
    promptStr = (
        "transform the following bulleted list into html code"
        + s
        + ". Your answer shouldn't include any text other than the bulleted list"
    )
    system = "You are a web developer who is creating a website for a client. The client has provided you with a bulleted list and you should transform the plan into html code "
    response = OpenAI.askGpt(promptStr, system)
    return response

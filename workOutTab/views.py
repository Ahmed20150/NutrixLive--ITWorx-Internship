from django.shortcuts import render
import os
import sys
import json
import users.models
import datetime
from django.http import HttpResponse
import openai
import workOutTab.models as work
import OpenAI
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed
from django.core.exceptions import ObjectDoesNotExist
import users.models


@csrf_exempt
def CreateWorkPlan(request):
    system = "You are a professional fitness trainer that is helping a user create a workout plan that suits their conditions and goals."

    data = json.loads(request.body)
    user = users.models.Users.objects.get(email=data["email"])

    try:
        newP = work.WorkOutPlan.objects.get(email=data["email"])

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
        goal = str(data["goal"])
        location = str(data["location"])
        injuries = str(data["injuries"])
        workouts = str(data["workouts"])
        focus = str(data["focus"])

        promptStr = str(
            "Create a workout plan that is tailored to my unique situation. Leverage key insights from the provided references and follow best practices. Your task is to create a workout plan based on my conditions . you should consider my injuries , goal , what part of my body I want to focus on, and whether my workout is home based or gym based. This guide should include a variety of exercises that cater to different fitness levels and goals, as well as detailed instructions on how to perform each exercise correctly. This sheet will detail modified exercises for individuals with physical limitations or injuries, ensuring they can still participate in fitness programs safely and effectively. The finished workout plan impact will be felt in the improved health and well-being of those who use it. The core success factors for this task include a keen understanding of anatomy and physiology, attention to detail, the workout plan should be  personalized to my needs and goals to ensure its effectiveness  ,and it should easy to follow. Output the workout plan in this format , for example if you were to give a plan for 2 days they should be in the following format : 1) Day1 : \n - [Workout 1 ] \n   - [Sub-bullet 1]   \n - [Sub-bullet 2] \n 2) Day2:\n- [Workout 2]     \n- [Sub-bullet 1]\n- [Sub-bullet 2]\n ---use these references :[{ title : The Complete Guide to Exercise Modification , author : Matt Brzycki , year : 2017 , keyInsights :[ The book provides a comprehensive guide to exercise modification, which is relevant to a fitness trainer who needs to customize workouts for clients with injuries, disabilities, or other limitations. , The author emphasizes the importance of assessing clients' needs and capabilities before modifying exercises, and provides practical tips for doing so. , The book includes detailed descriptions and illustrations of modified exercises for various body parts, which can help trainers design effective and safe workouts for clients. ]}, title : ACSM's Guidelines for Exercise Testing and Prescription , author : American College of Sports Medicine , year : 2018 , keyInsights :[ The book provides evidence-based guidelines for exercise testing and prescription, which can help a fitness trainer design safe and effective workout programs for clients. , The guidelines cover various aspects of exercise prescription, including cardiorespiratory, resistance, and flexibility training, as well as special populations such as older adults, pregnant women, and people with chronic diseases. , The book also includes practical tips for monitoring clients' progress and adjusting the exercise program accordingly. ]}, :[{ name : Anatomy and Physiology Knowledge , description : The ability to demonstrate a thorough understanding of human anatomy and physiology, specifically relating to exercise and movement. This includes knowledge of muscle groups, joint mechanics, and the body's response to exercise. },{ name : Attention to Detail , description : The ability to accurately and meticulously document exercise modifications, ensuring that each modification is appropriate for the individual's physical limitations or injuries. This includes carefully considering factors such as range of motion, intensity, and potential risks. Create a personalized workout plan with clear instructions for each workout and recommend time to rest between workouts for a "
            + gender
            + " based on the following data :  age = "
            + age
            + " , weight = "
            + weight
            + ", height ="
            + height
            + " , "
            + h
            + "goal is :"
            + goal
            + " and the workout nature is :"
            + location
            + " ,and the previous surgeries and injuries are :"
            + injuries
            + " ,"
            + g
            + "wants the number of workouts per week to be"
            + workouts
            + "so create a plan that consists of "
            + workouts
            + " days per week and the workout focus is :"
            + focus
            + ". Limit your answer to the bulleted list"
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
        goal = str(data["goal"])
        location = str(data["location"])
        injuries = str(data["injuries"])
        workouts = str(data["workouts"])
        focus = str(data["focus"])

        promptStr = str(
            "Create a workout plan that is tailored to my unique situation. Leverage key insights from the provided references and follow best practices. Your task is to create a workout plan based on my conditions . you should consider my injuries , goal , what part of my body I want to focus on, and whether my workout is home based or gym based. This guide should include a variety of exercises that cater to different fitness levels and goals, as well as detailed instructions on how to perform each exercise correctly. This sheet will detail modified exercises for individuals with physical limitations or injuries, ensuring they can still participate in fitness programs safely and effectively. The finished workout plan impact will be felt in the improved health and well-being of those who use it. The core success factors for this task include a keen understanding of anatomy and physiology, attention to detail, the workout plan should be  personalized to my needs and goals to ensure its effectiveness  ,and it should easy to follow. Output the workout plan in this format , for example if you were to give a plan for 2 days they should be in the following format : 1) Day1 : \n - [Workout 1 ] \n   - [Sub-bullet 1]   \n - [Sub-bullet 2] \n 2) Day2:\n- [Workout 2]     \n- [Sub-bullet 1]\n- [Sub-bullet 2]\n ---use these references :[{ title : The Complete Guide to Exercise Modification , author : Matt Brzycki , year : 2017 , keyInsights :[ The book provides a comprehensive guide to exercise modification, which is relevant to a fitness trainer who needs to customize workouts for clients with injuries, disabilities, or other limitations. , The author emphasizes the importance of assessing clients' needs and capabilities before modifying exercises, and provides practical tips for doing so. , The book includes detailed descriptions and illustrations of modified exercises for various body parts, which can help trainers design effective and safe workouts for clients. ]}, title : ACSM's Guidelines for Exercise Testing and Prescription , author : American College of Sports Medicine , year : 2018 , keyInsights :[ The book provides evidence-based guidelines for exercise testing and prescription, which can help a fitness trainer design safe and effective workout programs for clients. , The guidelines cover various aspects of exercise prescription, including cardiorespiratory, resistance, and flexibility training, as well as special populations such as older adults, pregnant women, and people with chronic diseases. , The book also includes practical tips for monitoring clients' progress and adjusting the exercise program accordingly. ]}, :[{ name : Anatomy and Physiology Knowledge , description : The ability to demonstrate a thorough understanding of human anatomy and physiology, specifically relating to exercise and movement. This includes knowledge of muscle groups, joint mechanics, and the body's response to exercise. },{ name : Attention to Detail , description : The ability to accurately and meticulously document exercise modifications, ensuring that each modification is appropriate for the individual's physical limitations or injuries. This includes carefully considering factors such as range of motion, intensity, and potential risks. Create a personalized workout plan with clear instructions for each workout and recommend time to rest between workouts for a "
            + gender
            + " based on the following data :  age = "
            + age
            + " , weight = "
            + weight
            + ", height ="
            + height
            + " , "
            + h
            + "goal is :"
            + goal
            + " and the workout nature is :"
            + location
            + " ,and the previous surgeries and injuries are :"
            + injuries
            + " ,"
            + g
            + "wants the number of workouts per week to be"
            + workouts
            + "so create a plan that consists of "
            + workouts
            + " days per week and the workout focus is :"
            + focus
            + ". Limit your answer to the bulleted list"
        )

        newPlan = OpenAI.askGpt(promptStr, system)
        newPlan = htmlTransformer(newPlan)
        res = {
            "message": str(newPlan),
        }

        newP = work.WorkOutPlan.objects.create(
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
        exist = work.WorkOutPlan.objects.get(email=data["email"])

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
    newP = work.WorkOutPlan.objects.get(email=data["email"])
    system = "You are a professional fitness trainer that is helping a user create a workout plan that suits their conditions and goals."

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

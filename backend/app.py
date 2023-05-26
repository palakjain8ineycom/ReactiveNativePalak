
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import base64

app = Flask(__name__)
cors = CORS(app)

global baseurl
baseurl = "https://fa-equm-test-saasfaprod1.fa.ocs.oraclecloud.com"


@app.route("/login", methods=["POST"])
def handle_login_data():
    data = request.get_json()
    global username
    username = data["username"]
    password = data["password"]
    ##base64 encode for username and password to authenticate
    sample_string = str(username) + ":" + str(password)
    sample_string_bytes = sample_string.encode("ascii")
    base64_bytes = base64.b64encode(sample_string_bytes)
    global baseencode
    baseencode = base64_bytes.decode("ascii")
    url = str(baseurl) + "/hcmRestApi/resources/11.13.18.05/absences"
    headers = {
        "Authorization": "Basic " + str(baseencode),
        "Content-Type": "application/json",
    }
    response = requests.request("GET", url, headers=headers)
    if response.status_code < 300 and response.status_code > 150:
        return jsonify({"status": "correct"})
    else:
        return jsonify({"status": "error"})

@app.route("/leavepost", methods=["POST"])
def handle_form_data():
    data = request.get_json()
    employee_number = data["employeeNumber"]
    leave_type = data["leaveType"]
    reason = data["reason"]
    start_date = data["startDate"]
    end_date = data["endDate"]
    url = str(baseurl) + "/hcmRestApi/resources/11.13.18.05/absences"
    headers = {
        "Authorization": "Basic " + str(baseencode),
        "Content-Type": "application/json",
    }
    payload = json.dumps(
        {
            "personNumber": employee_number,
            "employer": "Omega Healthcare Management Services Private Limited",
            "absenceType": leave_type,
            "startDate": str(start_date),
            "startTime": "05:00",
            "endDate": str(end_date),
            "endTime": "14:00",
            "absenceReason": reason,
            "absenceStatusCd": "SUBMITTED",
            "approvalStatusCd": "AWAITING",
        }
    )
    response = requests.request("POST", url, headers=headers, data=payload)

    if response.status_code < 300 and response.status_code > 150:
        return jsonify({"status": "success"})
    else:
        return jsonify(response.text)


@app.route("/leavelist", methods=["GET"])
def handle_leavelist_data():
    url = str(baseurl) + "/hcmRestApi/resources/11.13.18.05/absences"
    headers = {"Authorization": "Basic " + str(baseencode)}
    response = requests.get(url, headers=headers)
    data = response.json()
    leave_list = []

    for item in data["items"]:
        absenceStatusCd = item["absenceStatusCd"]
        approvalStatusCd = item["approvalStatusCd"]
        startDate = item["startDate"]
        absencereason = item["absenceReason"]
        endDate = item["endDate"]
        leave_item = {
            "absenceStatusCd": absenceStatusCd,
            "approvalStatusCd": approvalStatusCd,
            "startDate": startDate,
            "absencereason": absencereason,
            "endDate": endDate,
        }
        leave_list.append(leave_item)
    leave_list_json = json.dumps(leave_list)

    if response.status_code < 300 and response.status_code > 150:
        return leave_list_json
    else:
        return jsonify({"status": "error"})


@app.route("/persondetails", methods=["GET"])
def handle_person_data():
    url = (
        str(baseurl)
        + "/hcmRestApi/resources/11.13.18.05/publicWorkers?q=PersonNumber="
        + str(username)
    )
    headers = {
        "Authorization": "Basic " + str(baseencode),
        "Content-Type": "application/json",
    }
    response = requests.request("GET", url, headers=headers)
    data = response.json()
    personname = data["items"][0]["DisplayName"]
    orcname = data["items"][0]["Username"]
    return jsonify({"personname": personname, "orcname": orcname})


@app.route("/tasklist", methods=["GET"])
def handle_tasklist_data():
    url = baseurl + "/bpm/api/4.0/tasks?applicationContext=hcm"
    headers = {"Authorization": "Basic " + str(baseencode)}
    response = requests.get(url, headers=headers)
    data = response.json()
    task_list = []

    for item in data["items"]:
        title = item["title"]
        assignedDate = item["assignedDate"]
        task_item = {"title": title, "assignedDate": assignedDate}
        task_list.append(task_item)
    task_list_json = json.dumps(task_list)

    if response.status_code < 300 and response.status_code > 150:
        return task_list_json
    else:
        return jsonify({"status": "error"})


@app.route("/helpdesk", methods=["GET"])
def get_helpdesk_data():
    url = baseurl + "/crmRestApi/resources/11.13.18.05/serviceRequests"
    headers = {"Authorization": "Basic " + str(baseencode)}
    response = requests.get(url, headers=headers)
    data = response.json()
    helpdesk_tickets = []

    for item in data["items"]:
        reference_number = item["SrNumber"]
        title = item["Title"]
        creation_date = item["CreationDate"]
        Status = item["StatusCdMeaning"]
        assigned_to = item["AssigneePersonName"]
        ticket = {
            "SrNumber": reference_number,
            # 'SeverityCdMeaning': severity,
            "Title": title,
            # 'CategoryName': category,
            "CreationDate": creation_date,
            # 'LastUpdateDate': last_updated_date,
            "StatusCdMeaning": Status,
            "AssigneePersonName": assigned_to,
        }

        helpdesk_tickets.append(ticket)
    helpdesk_tickets_json = json.dumps(helpdesk_tickets)

    if response.status_code < 300 and response.status_code > 150:
        return helpdesk_tickets_json
    else:
        return jsonify({"status": "error"})



@app.route("/srdetails", methods=["GET", "POST"])
def handle_sr_details():
    if request.method == "GET":
        srNumber = request.args.get("SrNumber")
        url = (
            baseurl
            + "/crmRestApi/resources/11.13.18.05/serviceRequests?q=SrNumber=="
            + str(srNumber)
        )
        headers = {"Authorization": "Basic " + str(baseencode)}
        response = requests.get(url, headers=headers)
        data = response.json()
        sr_details = []
        for item in data["items"]:
            title = item["Title"]
            reportedBy = item["ReportedByPartyName"]
            severity = item["SeverityCdMeaning"]
            businessUnit = item["BusinessUnitName"]
            info = {
                "Title": title,
                "ReportedByPartyName": reportedBy,
                "SeverityCdMeaning": severity,
                "BusinessUnitName": businessUnit,
            }
            sr_details.append(info)
        if 150 < response.status_code < 300:
            return jsonify(sr_details)

        else:
            return jsonify({"status": "error"})

    elif request.method == "POST":
        data = request.get_json()
        srNumber = data["SrNumber"]
        return jsonify({"message": "POST request received"})


@app.route("/chat", methods=["POST"])
def handle_chat_data():
    data = request.get_json()
    message = data["message"]
    API_KEY = "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"
    SYSTEM_MESSAGE = {
        "role": "system",
        "content": "Strictly follow these commands: 1)If you're Asked any oracle/ leave/ employee related questions, redirect to this website: docs.oracle.comm. 2) If you're Asked any vulgar questions, say the prompt 'It's offensive'. 3) If you're asked any generic question, answer in chatgpt way",
    }
    chat_messages = []
    chat_messages.append({"role": "user", "content": message})
    api_messages = [SYSTEM_MESSAGE] + chat_messages
    api_request_body = {
        "model": "gpt-3.5-turbo",
        "messages": api_messages,
    }
    headers = {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
    }
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        json=api_request_body,
        headers=headers,
    )
    data = response.json()

    for choice in data["choices"]:
        message_content = choice["message"]["content"]

    return message_content


if __name__ == "__main__":
    app.run(host="192.168.29.245", port=5000, debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import base64

app = Flask(__name__)
cors = CORS(app)

@app.route('/login', methods=['POST'])
def handle_login_data():
    data = request.get_json()
    username = data['username']
    password = data['password']
    ##base64 encode for username and password to authenticate
    sample_string = str(username) + ":" + str(password)
    sample_string_bytes = sample_string.encode("ascii")
    base64_bytes = base64.b64encode(sample_string_bytes)
    global baseencode
    baseencode = base64_bytes.decode("ascii")

    url = "https://fa-equm-test-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/11.13.18.05/absences"
    headers = {
        'Authorization': 'Basic ' + str(baseencode),
        'Content-Type': 'application/json'
    }
    response = requests.request("GET", url, headers=headers)
    if (response.status_code < 300 and response.status_code > 150):
        return jsonify({"status":"correct"})
    else: 
        return jsonify({"status":"error"})

@app.route('/leavepost', methods=['POST'])
def handle_form_data():
    data = request.get_json()
    employee_number = data['employeeNumber']
    leave_type = data['leaveType']
    reason = data['reason']
    start_date = data['startDate']
    end_date = data['endDate']
    url = "https://fa-equm-test-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/11.13.18.05/absences"
    headers = {
        'Authorization': 'Basic ' + str(baseencode),
        'Content-Type': 'application/json'
    }
    payload = json.dumps({
        "personNumber": employee_number,
        "employer": "Omega Healthcare Management Services Private Limited",
        "absenceType": leave_type,
        "startDate": str(start_date),
        "startTime": "05:00",
        "endDate": str(end_date),
        "endTime": "14:00",
        "absenceReason": reason,
        "absenceStatusCd": "SUBMITTED",
        "approvalStatusCd": "AWAITING"
    })
    response = requests.request("POST", url, headers=headers, data=payload)
    if (response.status_code < 300 and response.status_code > 150):
        return jsonify({"status":"success"})
    else: 
        return jsonify(response.text)
  
if __name__ == '__main__':
    app.run(host='192.168.1.127', port=3000, debug=True)
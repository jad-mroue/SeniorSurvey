import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
//import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Question from "../components/question.compenent.js";
import Axios from "axios";
import url from "../utils/config.js";
import { log } from "react-native-reanimated";
//import { LOCATION } from "expo-permissions";



const ListQuestionScreen = ({ route,navigation }) => {
  console.log(route.params.section_id);
  console.log(route.params.department_id);
  const [list, setList] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [teacherr, setTeacherr] = React.useState([]);

  // let answers = [];

  // const [answers, setAnswers] = React.useState([]);

  const [chosenQuestionOption, setChosenQuestionOption] = React.useState([]);
  const [freetext, setFreeText] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [count, setCount] = React.useState(0);
  const expand = (index) => {
    let temp_list = [...list];
    temp_list[index].expanded = !temp_list[index].expanded;

    setList(temp_list);
  };

  const getListOfQuestions = async () => {
    const tkk = await AsyncStorage.getItem("token");
    Axios({
      method: "GET",
      url:
        url +
        `student/course/${route.params.section_id}/${route.params.department_id}`,
      // url: url + `student/course/66/1`,

      headers: {
        x_auth_token: tkk,
      },
    })
      .then((response) => {
        console.log("here");
        console.log(JSON.stringify(response.data));
        // con(JSON.stringify(response.data))
        setTeacherr(response.data.teacher);
        setTeacher(response.data.teacher.teacher_id);
        let ll = response.data.lists;
        console.log(JSON.stringify(ll));

        setList(ll)
        
      })
      .catch((err) => {
        console.log("error");
      });
  };

  React.useEffect(() => {
    getListOfQuestions();
  }, []);
  

  const submitAnswers = async () => {
    let allanswers = [];
    list.forEach((l) => {
      l.questions.forEach((q) => {
        allanswers.push(q.answer[0]);
      });
    });

    const tk = await AsyncStorage.getItem("token");

    Axios({
      url: url + `student/course/${route.params.section_id}`,
      method: "POST",
      data: {
        free_text: freetext,
        teacher_id: teacher,
        answers:allanswers,
      },
      headers: {
        x_auth_token: tk,
        'Content-Type':'application/json'
      },
    })
      .then((response) => {
        navigation.navigate('ListSurveysScreen')
        alert(response.data.message);
        
      })
      .catch((error) => {
        alert("Error Happened Please answer all questions and give a feedback")
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
        <Text style={styles.paragraph}>
          {"Course Code: "}
          {route.params.surveyid}
        </Text>
        <Text style={styles.paragraph}>
          {"Teacher: "}
          {teacherr.first_name} {teacherr.last_name}
        </Text>
        <Text style={[styles.title, styles.Red]}>
          {route.params.course_name}
        </Text>
        
       

        {list.map((l, i) => {
          return (
            <View
              key={i + Math.random() * 2357253752}
              style={{ flexDirection: "column" }}
            >
              <TouchableOpacity
                onPress={() => expand(i)}
                style={{ alignItems: "center", flexDirection: "row" }}
              >
                {/* {l.expanded ? (
                <Icon name="caret-up" size={30} style={{ padding: 5 }} />
              ) : ( */}
                <Icon name="caret-down" size={30} style={{ padding: 5 }} />

                <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5 }}>
                  {l.list_name && l.list_name}
                </Text>
              </TouchableOpacity>
              {l.questions.map((question, j) => {
                return (
                  <React.Fragment key={j + Math.random() * 2357253752}>
                    <View
                      style={{ margin: 15 }}
                      key={j + Math.random() * 2357253752}
                    />
                    <Question
                      question={question.question_description}
                      key={question.question_id}
                      options={question.options.map(option=>{
                        return {
                          label: option.option_description,
                          value: option.option_id,
                        }
                      })}
                      setSelectedOption={(value) => {
                        let val = question.options.find(option => option.option_id === value)

                        let rateValue = question.options.indexOf(val) + 1
                        answers.filter((a)=>a.question_id !== question.question_id)

                        let oldAnswers = [...answers]

                        oldAnswers.push({
                          question_id: question.question_id,
                          question_description: question.question_description,
                          number_options: question.number_options,
                          weight: question.weight,
                          rate: rateValue
                        })

                        question.answer = oldAnswers
                        // console.log(oldAnswers)
                        
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </View>
          );
        })}


        
<TextInput
          style={{
            borderWidth: 0.5,
            margin: 10,
            padding: 15,
            borderRadius: 10,
            height: 80,
            fontSize: 25
          }}
          placeholder={"Quick Feedback before you finish"}
          onChange={(event)=>setFreeText(event.nativeEvent.text)}
          
          value={freetext}
      
        />
         
        <Text style={{ margin: 10 }}>
          {
            "if your comment is innapropriate it will be reported and your ID will be known"
          }
        </Text>

        <TouchableOpacity
          onPress={() => {
            submitAnswers();
            
          }}
          style={{ alignSelf: "center", bottom: 0, margin: 30 }}
        >
          <Text style={{ fontSize: 25 }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const containsObject = (obj, list) => {
  return list.some(function (elem) {
    return elem === obj;
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
    // margin: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    margin: 4,
    fontSize: 38,
    textAlign: "left",
    padding: 1,
    marginBottom: 20,
  },
  Red: {
    color: "#f44336",
  },
});

export default ListQuestionScreen;

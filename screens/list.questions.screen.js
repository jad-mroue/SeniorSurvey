import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
//import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Question from "../components/question.compenent";
import Axios from "axios";
import url from "../utils/config";
//import { LOCATION } from "expo-permissions";


const ListQuestionScreen = ({ route }) => {
  console.log(route.params.section_id);
  console.log(route.params.department_id);
  const [list, setList] = React.useState([]);

  let answers = []

  // const [answers, setAnswers] = React.useState([]);

  const [chosenQuestionOption, setChosenQuestionOption] = React.useState([]);
  const [free_text, setFreeText] = React.useState("");
  const [teacher, setTeacher] = React.useState("");

  const expand = (index) => {
    let temp_list = [...list];
    temp_list[index].expanded = !temp_list[index].expanded;

    setList(temp_list);
  };

  const getListOfQuestions = () => {
    // cont token = AsyncStorage.getItem('user_auth_token')

    Axios({
      method: "GET",
      url:
        url +
        `student/course/${route.params.section_id}/${route.params.department_id}`,
      // url: url + `student/course/66/1`,

      headers: {
        x_auth_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MDA1MDg3MTIsImV4cCI6MTYwMDc2NzkxMn0.DlVBjnT5O94HHN8ud0Zty8LVr2oxRRY7YcYx5MqeC0g",
      },
    })
      .then((response) => {
        console.log("here");
        console.log(response.data);
        // con(JSON.stringify(response.data))
        setTeacher(response.data.teacher.teacher_id)
        let list = response.data.lists;
        list.forEach((l) => {
          l.expanded = false;
        });
        setList(list);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  React.useEffect(() => {
    getListOfQuestions();
  }, []);
  console.log(chosenQuestionOption);

  const submitAnswers = () => {
    Axios({
      url:
        url +
        `student/course/${route.params.section_id}`,
      method: "POST",
      data: {
        free_text: free_text,
        teacher_id: teacher,
        answers,
      },
      headers: {
        x_auth_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MDA1MDg3MTIsImV4cCI6MTYwMDc2NzkxMn0.DlVBjnT5O94HHN8ud0Zty8LVr2oxRRY7YcYx5MqeC0g",
      },
    })
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 50 }}>{route.params.course_name}</Text>
      {list.map((l, i) => {
        return (
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              key={i + Math.random() * 2357253752}
              onPress={() => expand(i)}
              style={{ alignItems: "center", flexDirection: "row" }}
            >
              {l.expanded ? (
                <Icon name="caret-up" size={30} style={{ padding: 5 }} />
              ) : (
                <Icon name="caret-down" size={30} style={{ padding: 5 }} />
              )}

              <Text style={{ fontSize: 25, fontWeight: "bold", padding: 5 }}>
                {l.list_name}
              </Text>
            </TouchableOpacity>
            {l.expanded &&
              l.questions.map((question, j) => {
                return (
                  <React.Fragment key={j + Math.random() * 2357253752}>
                    <View
                      style={{ margin: 15 }}
                      key={j + Math.random() * 2357253752}
                    />
                    <Question
                      question={question.question_description}
                      key={question.question_id}
                      options={question.options}
                      setSelectedOption={(option) => {
                        answers.push({
                          question_id: question.question_id,
                          weight: question.weight,
                          number_options: question.options.length,
                          rate: option.id
                        })
                      }}
                    />
                  </React.Fragment>
                );
              })}
          </View>
        );
      })}
      <TextInput style={{borderWidth:0.5,margin:10,padding:15,borderRadius:10}} placeholder={"If you have anything to add  "} value={free_text} onChangeText={(free_text)=>setFreeText(free_text)}/>
      <TouchableOpacity onPress={()=>
        {  if(answers.length !== list.length){alert("Please fill all questions ")}
        else{
        submitAnswers()}}} style={{alignSelf:'center',bottom:0,margin:30}}>
        <Text style={{fontSize:25}}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
    // margin: 5,
  },
});

export default ListQuestionScreen;

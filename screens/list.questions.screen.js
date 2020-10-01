import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
//import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Question from "../components/question.compenent.js";
import Axios from "axios";
import url  from "../utils/config.js";
//import { LOCATION } from "expo-permissions";

const ListQuestionScreen = ({ route }) => {
  console.log(route.params.section_id);
  console.log(route.params.department_id);
  const [list, setList] = React.useState([]);
  const [answers,setAnswers] = React.useState([])
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
    const tkk = await AsyncStorage.getItem('token')
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
        console.log(response.data);
        // con(JSON.stringify(response.data))
        
        setTeacher(response.data.teacher.teacher_id);
        let ll = response.data.lists;
        let counter = 0;
        ll.forEach((l) => {
          l.expanded = false;
          l.questions.forEach(q=>{
            counter = counter + 1
            q.selectedOption = "";
          })
        });
        setCount(counter)
        setList(ll);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  React.useEffect(() => {
    getListOfQuestions();
    
  }, []);

  const submitAnswers = async () => {
   const tk = await AsyncStorage.getItem('token')

    Axios({
      url: url + `student/course/${route.params.section_id}`,
      method: "POST",
      data: {
        free_text: freetext,
        teacher_id: teacher,
        answers,
      },
      headers: {
        x_auth_token: tk,
      },
    })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView >
        <Text style={{ fontSize: 50 }}>{route.params.course_name}</Text>
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
                  {l.list_name}
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
                      options={question.options}
                      setSelectedOption={(option) => {
                        question.selected_option = option;
                        console.log(question);
                        
                        let xxx = answers.filter(a=> a.question_id !== question.question_id)


                        setAnswers(xxx)
                        setAnswers((prevAnswers)=>[
                          ...prevAnswers,

                          {
                            question_id: question.question_id,
                            question_description: question.question_description,
                            number_options: question.number_options,
                            weight: question.weight,
                          }
                        ])
              
                        
                        // answers.push();
                      }}
                      selectedOption={question.selected_option}
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
          }}
          placeholder={"Give us feedback"}
          value={freetext}
          onChangeText={setFreeText}
        />
        <TouchableOpacity
          onPress={() =>{
            
            if(answers.length != count){
              alert("Please answer all questions" + answers.length)
            }else{
              
              submitAnswers()
            }
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

  return list.some(function(elem) {
    return elem === obj
  })
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
    // margin: 5,
  },
});

export default ListQuestionScreen;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GraduationCap, Trophy, ChevronRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const quizData: Record<string, Question[]> = {
  "orbital-mechanics": [
    {
      id: 1,
      question: "What is the minimum velocity needed to reach low Earth orbit?",
      options: ["5 km/s", "7.8 km/s", "11.2 km/s", "15 km/s"],
      correctAnswer: 1,
      explanation: "Orbital velocity for LEO is approximately 7.8 km/s. This is the velocity at which gravitational pull and centrifugal force balance out.",
      category: "Orbital Mechanics"
    },
    {
      id: 2,
      question: "What does 'delta-v' represent in orbital mechanics?",
      options: ["Change in velocity", "Distance traveled", "Orbital period", "Gravitational force"],
      correctAnswer: 0,
      explanation: "Delta-v (Δv) represents the change in velocity needed to perform a maneuver, such as launching, landing, or changing orbits.",
      category: "Orbital Mechanics"
    },
    {
      id: 3,
      question: "What is a geostationary orbit primarily used for?",
      options: ["Scientific research", "Telecommunications", "Weather monitoring", "Space tourism"],
      correctAnswer: 1,
      explanation: "Geostationary orbits are at 35,786 km altitude and allow satellites to remain fixed over one point on Earth, ideal for telecommunications.",
      category: "Orbital Mechanics"
    },
    {
      id: 4,
      question: "What is escape velocity from Earth?",
      options: ["7.8 km/s", "9.8 km/s", "11.2 km/s", "15 km/s"],
      correctAnswer: 2,
      explanation: "Escape velocity is 11.2 km/s - the minimum speed needed to break free from Earth's gravitational pull without further propulsion.",
      category: "Orbital Mechanics"
    }
  ],
  "rocket-propulsion": [
    {
      id: 5,
      question: "What is the most common fuel combination for liquid rockets?",
      options: ["Hydrogen and Nitrogen", "RP-1 and Liquid Oxygen", "Methane and Helium", "Kerosene and Air"],
      correctAnswer: 1,
      explanation: "RP-1 (refined kerosene) and liquid oxygen (LOX) is the most widely used propellant combination, used by Falcon 9 and many other rockets.",
      category: "Rocket Propulsion"
    },
    {
      id: 6,
      question: "What does 'specific impulse' (Isp) measure?",
      options: ["Engine weight", "Fuel efficiency", "Thrust power", "Burn time"],
      correctAnswer: 1,
      explanation: "Specific impulse measures how efficiently a rocket uses propellant, expressed in seconds. Higher Isp means better fuel efficiency.",
      category: "Rocket Propulsion"
    },
    {
      id: 7,
      question: "What is the Tsiolkovsky rocket equation used for?",
      options: ["Calculating orbital period", "Determining mass ratio", "Measuring thrust", "Finding escape velocity"],
      correctAnswer: 1,
      explanation: "The Tsiolkovsky equation calculates the relationship between delta-v, exhaust velocity, and the rocket's mass ratio (wet/dry mass).",
      category: "Rocket Propulsion"
    },
    {
      id: 8,
      question: "Why are rockets staged?",
      options: ["To reduce weight", "To increase efficiency", "To reach higher velocities", "All of the above"],
      correctAnswer: 3,
      explanation: "Staging allows rockets to shed empty fuel tanks and engines, reducing weight and increasing efficiency to achieve the high velocities needed for orbit.",
      category: "Rocket Propulsion"
    }
  ],
  "spacecraft-systems": [
    {
      id: 9,
      question: "What power source do most deep space probes use?",
      options: ["Solar panels", "Nuclear batteries", "RTGs", "Fuel cells"],
      correctAnswer: 2,
      explanation: "Radioisotope Thermoelectric Generators (RTGs) convert heat from radioactive decay into electricity, essential for missions far from the Sun.",
      category: "Spacecraft Systems"
    },
    {
      id: 10,
      question: "What is the primary purpose of a spacecraft's reaction wheels?",
      options: ["Generate power", "Control attitude", "Provide thrust", "Store data"],
      correctAnswer: 1,
      explanation: "Reaction wheels control spacecraft orientation (attitude) by spinning up or down, using conservation of angular momentum.",
      category: "Spacecraft Systems"
    },
    {
      id: 11,
      question: "What does a heat shield protect against during reentry?",
      options: ["Radiation", "Friction heat", "Pressure", "Magnetic fields"],
      correctAnswer: 1,
      explanation: "Heat shields use ablative materials to dissipate the intense heat generated by atmospheric compression during reentry at high speeds.",
      category: "Spacecraft Systems"
    },
    {
      id: 12,
      question: "What is the function of a spacecraft's transponder?",
      options: ["Generate power", "Navigate", "Communicate", "Control temperature"],
      correctAnswer: 2,
      explanation: "Transponders receive, amplify, and retransmit radio signals, enabling communication between spacecraft and ground stations.",
      category: "Spacecraft Systems"
    }
  ],
  "space-history": [
    {
      id: 13,
      question: "Which country launched the first artificial satellite?",
      options: ["United States", "Soviet Union", "China", "Europe"],
      correctAnswer: 1,
      explanation: "The Soviet Union launched Sputnik 1 on October 4, 1957, marking the beginning of the Space Age.",
      category: "Space History"
    },
    {
      id: 14,
      question: "Who was the first human in space?",
      options: ["Neil Armstrong", "Yuri Gagarin", "Alan Shepard", "John Glenn"],
      correctAnswer: 1,
      explanation: "Soviet cosmonaut Yuri Gagarin became the first human in space on April 12, 1961, aboard Vostok 1.",
      category: "Space History"
    },
    {
      id: 15,
      question: "When did humans first walk on the Moon?",
      options: ["1965", "1967", "1969", "1971"],
      correctAnswer: 2,
      explanation: "Apollo 11 landed on the Moon on July 20, 1969, with Neil Armstrong and Buzz Aldrin becoming the first humans to walk on its surface.",
      category: "Space History"
    },
    {
      id: 16,
      question: "What was the first reusable spacecraft?",
      options: ["Apollo CSM", "Space Shuttle", "Soyuz", "Dragon"],
      correctAnswer: 1,
      explanation: "The Space Shuttle was the first reusable orbital spacecraft, with Columbia making the first flight in 1981.",
      category: "Space History"
    }
  ]
};

export const EducationalQuiz = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("orbital-mechanics");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const questions = quizData[selectedCategory];
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect && !answeredQuestions.includes(question.id)) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, question.id]);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleReset();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <GraduationCap className="w-6 h-6" />
            Space Exploration Quiz
          </CardTitle>
          <CardDescription>
            Test your knowledge of orbital mechanics, rocket science, spacecraft systems, and space history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2">
              <TabsTrigger value="orbital-mechanics">Orbital Mechanics</TabsTrigger>
              <TabsTrigger value="rocket-propulsion">Rocket Propulsion</TabsTrigger>
              <TabsTrigger value="spacecraft-systems">Spacecraft Systems</TabsTrigger>
              <TabsTrigger value="space-history">Space History</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Score and Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                Score: {score}/{questions.length}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Quiz
            </Button>
          </div>

          <Progress value={progress} className="h-2" />

          {/* Question Card */}
          <Card className="bg-card/50 border-2">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">{question.category}</Badge>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                disabled={showResult}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`flex-1 cursor-pointer p-3 rounded-lg border transition-all ${
                        showResult
                          ? index === question.correctAnswer
                            ? "bg-success/20 border-success"
                            : selectedAnswer === index
                            ? "bg-destructive/20 border-destructive"
                            : "bg-card"
                          : "bg-card hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && index === question.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        )}
                        {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResult && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {selectedAnswer === question.correctAnswer ? (
                        <CheckCircle2 className="w-6 h-6 text-success mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive mt-1" />
                      )}
                      <div>
                        <p className="font-semibold mb-2">
                          {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                {!showResult ? (
                  <Button
                    onClick={handleAnswer}
                    disabled={selectedAnswer === null}
                    className="flex-1"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={isLastQuestion ? handleReset : handleNext}
                    className="flex-1"
                  >
                    {isLastQuestion ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start Over
                      </>
                    ) : (
                      <>
                        Next Question
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Final Score */}
          {isLastQuestion && showResult && (
            <Card className="cosmic-glow bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <Trophy className="w-16 h-16 mx-auto text-primary" />
                  <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                  <p className="text-4xl font-bold text-gradient">{score}/{questions.length}</p>
                  <p className="text-muted-foreground">
                    {score === questions.length
                      ? "Perfect score! You're a space expert! 🚀"
                      : score >= questions.length * 0.7
                      ? "Great job! You know your space stuff! 🌟"
                      : score >= questions.length * 0.5
                      ? "Good effort! Keep learning! 📚"
                      : "Keep studying and try again! 💪"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

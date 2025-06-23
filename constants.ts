
import { LanguageOption } from './types';

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const PROGRAMMING_LANGUAGES: LanguageOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go (Golang)" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "typescript", label: "TypeScript" },
  { value: "dart", label: "Dart" },
  { value: "scala", label: "Scala" },
  { value: "perl", label: "Perl" },
  { value: "haskell", label: "Haskell" },
  { value: "lua", label: "Lua" },
  { value: "r", label: "R" },
  { value: "cpp", label: "C++"},
];

export const DEFAULT_SOURCE_LANGUAGE = "javascript";
export const DEFAULT_TARGET_LANGUAGE = "go";
    
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LogoStar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <path d="M12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2Z" fill="currentColor"/>
  </svg>
);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
  const navigate = useNavigate();

  const isPasswordHidden = focusedInput === "password" && !showPassword;
  const isPasswordVisible = focusedInput === "password" && showPassword;
  const isEmailFocused = focusedInput === "email";

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eyes = document.querySelectorAll('.eye-pupil');
      eyes.forEach((eye) => {
        const parent = eye.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const isDotEye = parent.classList.contains('dot-eye-container');
        const maxMove = isDotEye ? 4 : 5; 
        
        const moveDist = Math.min(maxMove, distance * 0.05);
        const angle = Math.atan2(dy, dx);
        
        const moveX = Math.cos(angle) * moveDist;
        const moveY = Math.sin(angle) * moveDist;
        
        (eye as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[1000px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-border">
        
        {/* Left Side: Geometric Shapes */}
        <div className="relative hidden w-1/2 lg:flex bg-background items-center justify-center p-10 overflow-hidden">
          <div className="relative w-[340px] h-[340px] flex items-end justify-center scale-[1.35]">
            
            {/* Purple Shape */}
            <div className={`absolute w-[110px] h-[220px] bg-[#6B38FB] left-[40px] bottom-0 z-0 flex flex-col items-center transition-all duration-300 ${isEmailFocused ? 'translate-y-[-5px]' : ''}`}>
              <div className="flex gap-4 mt-12">
                {isPasswordHidden ? (
                  <>
                    <div className="w-[16px] h-[16px] flex items-center justify-center"><div className="w-[12px] h-[3px] bg-[#111] rounded-full"></div></div>
                    <div className="w-[16px] h-[16px] flex items-center justify-center"><div className="w-[12px] h-[3px] bg-[#111] rounded-full"></div></div>
                  </>
                ) : (
                  <>
                    <div className={`w-[16px] h-[16px] bg-white rounded-full flex items-center justify-center relative ${isPasswordVisible ? 'scale-125' : ''} transition-all`}>
                      <div className={`w-[6px] h-[6px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out ${isPasswordVisible ? 'scale-150' : ''}`}></div>
                    </div>
                    <div className={`w-[16px] h-[16px] bg-white rounded-full flex items-center justify-center relative ${isPasswordVisible ? 'scale-125' : ''} transition-all`}>
                      <div className={`w-[6px] h-[6px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out ${isPasswordVisible ? 'scale-150' : ''}`}></div>
                    </div>
                  </>
                )}
              </div>
              <div className={`mt-3 rounded-full opacity-80 transition-all duration-300 ${isEmailFocused ? 'w-[14px] h-[7px] border-b-[3px] border-[#111] bg-transparent' : isPasswordVisible ? 'w-[10px] h-[10px] bg-[#111]' : 'w-5 h-[3px] bg-[#111]'}`}></div>
            </div>

            {/* Black Shape */}
            <div className={`absolute w-[60px] h-[140px] bg-[#1C1C1F] left-[135px] bottom-0 z-10 flex flex-col items-center transition-all duration-300 ${isPasswordHidden ? 'translate-y-2' : ''}`}>
              <div className="flex gap-[10px] mt-8">
                {isPasswordHidden ? (
                  <>
                    <div className="w-[12px] h-[12px] flex items-center justify-center"><div className="w-[8px] h-[2px] bg-white/50 rounded-full"></div></div>
                    <div className="w-[12px] h-[12px] flex items-center justify-center"><div className="w-[8px] h-[2px] bg-white/50 rounded-full"></div></div>
                  </>
                ) : (
                  <>
                    <div className="w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center relative">
                      <div className={`w-[5px] h-[5px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out ${isPasswordVisible ? 'scale-125' : ''}`}></div>
                    </div>
                    <div className="w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center relative">
                      <div className={`w-[5px] h-[5px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out ${isPasswordVisible ? 'scale-125' : ''}`}></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Yellow Shape */}
            <div className={`absolute w-[80px] h-[110px] bg-[#FACC15] left-[185px] bottom-0 rounded-t-[40px] z-20 transition-all duration-300 ${isEmailFocused ? '-rotate-3 origin-bottom-left' : isPasswordVisible ? 'rotate-3 origin-bottom-right' : ''}`}>
              {isPasswordHidden ? (
                <div className="absolute top-8 left-5 w-[12px] h-[12px] flex items-center justify-center">
                  <div className="w-[10px] h-[3px] bg-[#111] rounded-full"></div>
                </div>
              ) : (
                <div className="absolute top-8 left-5 w-[12px] h-[12px] rounded-full flex items-center justify-center dot-eye-container relative">
                  <div className={`w-[8px] h-[8px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out absolute ${isPasswordVisible ? 'scale-150' : ''}`}></div>
                </div>
              )}
              <div className={`absolute top-[48px] left-[35px] w-[50px] bg-[#111] z-30 transition-all duration-300 ${isPasswordVisible ? 'h-[10px] rounded-[10px] rotate-[-5deg]' : isEmailFocused ? 'h-[4px] rounded-full rotate-2' : 'h-[4px] rounded-full'}`}></div>
            </div>

            {/* Orange Shape */}
            <div className={`absolute w-[180px] h-[90px] bg-[#F97316] left-[10px] bottom-0 rounded-t-[90px] z-30 flex justify-center transition-all duration-300 origin-bottom ${isEmailFocused ? 'scale-[1.05]' : isPasswordHidden ? 'scale-[0.95]' : ''}`}>
              <div className="flex gap-7 mt-10 relative">
                {isPasswordHidden ? (
                  <>
                    <div className="w-[10px] h-[10px] flex items-center justify-center"><div className="w-[10px] h-[3px] bg-[#111] rounded-full"></div></div>
                    <div className="w-[10px] h-[10px] flex items-center justify-center"><div className="w-[10px] h-[3px] bg-[#111] rounded-full"></div></div>
                  </>
                ) : (
                  <>
                    <div className={`w-[10px] h-[10px] rounded-full flex items-center justify-center dot-eye-container relative ${isPasswordVisible ? 'scale-150' : ''} transition-all`}>
                       <div className="w-[7px] h-[7px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out absolute"></div>
                    </div>
                    <div className={`w-[10px] h-[10px] rounded-full flex items-center justify-center dot-eye-container relative ${isPasswordVisible ? 'scale-150' : ''} transition-all`}>
                       <div className="w-[7px] h-[7px] bg-[#111] rounded-full eye-pupil transition-transform duration-75 ease-out absolute"></div>
                    </div>
                  </>
                )}
                {/* Mouth */}
                <div className={`absolute left-1/2 -translate-x-1/2 top-4 transition-all duration-300 ${isEmailFocused ? 'w-[20px] h-[10px] bg-[#111] rounded-b-full' : isPasswordHidden ? 'w-[10px] h-[10px] bg-[#111] rounded-full' : isPasswordVisible ? 'w-[14px] h-[14px] bg-[#111] rounded-full' : 'w-[14px] h-[7px] bg-[#111] rounded-b-full'}`}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <LogoStar />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-bold text-gray-900 mb-1">Eagle Security</h1>
            <p className="text-[15px] text-gray-500">Please enter your details</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[14px] font-medium text-gray-700">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john.doe@company.com" 
                className="h-11 border-gray-200 focus:border-black rounded-lg text-sm" 
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[14px] font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 pr-10 border-gray-200 focus:border-black rounded-lg text-sm"
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" className="w-[14px] h-[14px] rounded border-gray-300 text-black focus:ring-black accent-black" />
                Remember for 30 days
              </label>
              <button type="button" className="text-sm font-medium text-gray-800 hover:text-black hover:underline focus:outline-none">
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <Button className="w-full h-12 font-medium bg-[#111] hover:bg-black text-white rounded-full transition-all flex items-center justify-center p-0" onClick={() => navigate("/dashboard")}>
                Log In
              </Button>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full h-12 border-gray-200 text-gray-700 bg-[#f9fafb] hover:bg-gray-100 rounded-full transition-all flex items-center justify-center font-medium shadow-sm hover:shadow-none p-0" onClick={() => {}}>
                <img src={`https://www.svgrepo.com/show/475656/google-color.svg`} alt="Google" className="w-5 h-5 mr-3" />
                Log in with Google
              </Button>
            </div>

            <p className="text-center text-[14px] text-gray-500 mt-8 pt-4">
              Don't have an account? <button type="button" className="font-semibold text-black hover:underline focus:outline-none ml-1">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

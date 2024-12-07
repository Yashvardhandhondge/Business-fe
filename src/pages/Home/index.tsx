
import {Link} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart, ArrowRight, Facebook, Twitter, LinkedinIcon as LinkedIn } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">My Business</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="#" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">About Us</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">Contact</Link>
          </nav>
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex text-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row flex justify-center items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl text-center md:text-5xl font-bold mb-4">Instant Business Evaluation Without Login</h1>
            <p className="text-xl mb-8">Analyze one business for free with no account required.</p>
            <div className="space-x-4">
              <Link to='/signup'  className="bg-white text-blue-600 px-4 py-4 rounded-2xl  hover:bg-gray-100">
              Sign Up
              </Link>
              <Link to='/login'   className="bg-white  border-white px-4 py-4 rounded-2xl  text-blue-600 hover:bg-white hover:text-blue-600">
                  Login
              </Link>
            </div>
          </div>
        
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span>Evaluate Key Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Assess your business across 13 key financial indicators for comprehensive insights.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-6 w-6 text-blue-600" />
                  <span>Dynamic KPI Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Modify metrics directly and see instant recalculations for real-time analysis.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-6 w-6 text-blue-600" />
                  <span>Dashboard Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Easily manage and compare multiple businesses from a centralized dashboard.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See It In Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Results</CardTitle>
                <CardDescription>Editable metric cards with instant recalculation</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Evaluation Results Preview"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>Manage multiple businesses with ease</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Dashboard Preview"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


     
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BizEval</h3>
              <p className="text-gray-400">Empowering businesses with instant evaluation tools.</p>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="space-x-4 mb-4">
                <Link to="#" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
                <Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link to="#" className="text-gray-400 hover:text-white">Contact</Link>
              </div>
              <div className="flex space-x-4">
                <Link to="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <LinkedIn className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


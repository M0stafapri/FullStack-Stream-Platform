import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database for demo purposes
const users = [
  {
    id: "admin123",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "user123",
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: "creator123",
    name: "Jane Smith",
    email: "creator@example.com",
    password: "creator123",
    role: "creator",
  },
]

// Modify the POST function to set cookies more reliably:
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user in our mock database
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      console.log("Login API: Invalid credentials for", email)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    console.log("Login API: Successful login for", email)

    // Create a user object without the password
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // Generate a mock token
    const accessToken = `mock-${user.role}-access-token-${Date.now()}`

    // Set cookies with proper options
    cookies().set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    })

    // Return the user data and tokens
    return NextResponse.json({
      success: true,
      user: safeUser,
      accessToken: accessToken,
      refreshToken: `mock-refresh-token-${Date.now()}`,
    })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    )
  }
}

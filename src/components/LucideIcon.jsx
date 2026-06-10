/**
 * LucideIcon — Central icon resolver for the DSC site.
 * Accepts a `name` string from content.js and renders the
 * corresponding Lucide React icon, keeping data free of JSX.
 */
import {
  FileText, Scale, Search, Target, ShieldCheck, Swords,
  Building2, FileSignature, Landmark, Handshake,
  CheckCircle2, Paperclip, ChevronRight, Send, ArrowLeft,
  ClipboardList, MapPin, Factory, ShoppingBag, Monitor,
  Hotel, HardHat, Heart, BookOpen, Truck, Users, ClipboardCheck,
  UserMinus, Calendar, Clock, Laptop, Lock, TrendingUp, UserCheck,
  Coins, Sun, Umbrella, Shield, GitBranch, AlertTriangle,
  GraduationCap, Stethoscope, PenTool, Briefcase, CheckSquare,
  CarFront, Route, FileCheck
} from 'lucide-react';

const iconMap = {
  FileText,
  Scale,
  Search,
  Target,
  ShieldCheck,
  Swords,
  Building2,
  FileSignature,
  Landmark,
  Handshake,
  CheckCircle2,
  Paperclip,
  ChevronRight,
  Send,
  ArrowLeft,
  ClipboardList,
  MapPin,
  
  // Industry Icons
  Factory,
  ShoppingBag,
  Monitor,
  Hotel,
  HardHat,
  Heart,
  BookOpen,
  Truck,
  
  // Challenge Icons
  Users,
  ClipboardCheck,
  UserMinus,
  Calendar,
  Clock,
  Laptop,
  Lock,
  TrendingUp,
  UserCheck,
  Coins,
  Sun,
  Umbrella,
  Shield,
  GitBranch,
  AlertTriangle,
  GraduationCap,
  Stethoscope,
  PenTool,
  Briefcase,
  CheckSquare,
  CarFront,
  Route,
  FileCheck
};

export default function LucideIcon({ name, size = 24, strokeWidth = 1.8, className = '', color }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} color={color} />;
}

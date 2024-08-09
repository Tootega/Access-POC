using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading;

using Microsoft.Data.SqlClient;

using Newtonsoft.Json;

using STX.Core.Exceptions;

namespace STX.Core
{
	public static class XUtils
	{
		private static readonly string SecurityKey = "http://www.2am5ana.c0m";
		public static string Serialize(object pObject)
		{
			using (MemoryStream ms = new MemoryStream())
			using (StreamWriter sr = new StreamWriter(ms))
			using (JsonTextWriter _Writer = new JsonTextWriter(sr))
			{
				sr.AutoFlush = true;
				JsonSerializer js = new JsonSerializer();
				js.Serialize(_Writer, pObject);
				ms.Position = 0;	
				return Encoding.UTF8.GetString(ms.ToArray());
			}
		}

		public static void Deserialize(object pObject, string pData)
		{
			using (MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(pData)))
			using (TextReader sr = new StreamReader(ms))
			using (JsonTextReader _Reader = new JsonTextReader(sr))
			{
				JsonSerializer js = new JsonSerializer();
				js.Populate(_Reader, pObject);
			}
		}


		public static string GetMd5Hash(string input)
		{
			using MD5 md5Hasher = MD5.Create();
			byte[] data = md5Hasher.ComputeHash(Encoding.UTF8.GetBytes(input));
			StringBuilder sBuilder = new StringBuilder();

			for (int i = 0; i < data.Length; i++)
				sBuilder.Append(data[i].ToString("x2"));
			return sBuilder.ToString();
		}

		public static string Encrypt(string toEncrypt, bool useHashing)
		{
			byte[] keyArray;
			byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);
			if (useHashing)
			{
				using MD5 hashmd5 = MD5.Create();
				keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(SecurityKey));
				hashmd5.Clear();
			}
			else
				keyArray = UTF8Encoding.UTF8.GetBytes(SecurityKey);
			using TripleDES tdes = TripleDES.Create();
			tdes.Key = keyArray;
			tdes.Mode = CipherMode.ECB;
			tdes.Padding = PaddingMode.PKCS7;

			ICryptoTransform cTransform = tdes.CreateEncryptor();
			byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
			tdes.Clear();
			return Convert.ToBase64String(resultArray, 0, resultArray.Length);
		}

		public static string Decrypt(string cipherString, bool useHashing)
		{
			byte[] keyArray;
			byte[] toEncryptArray = Convert.FromBase64String(cipherString);

			if (useHashing)
			{
				using MD5 hashmd5 = MD5.Create();
				keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(SecurityKey));
				hashmd5.Clear();
			}
			else
			{
				keyArray = UTF8Encoding.UTF8.GetBytes(SecurityKey);
			}

			using TripleDES tdes = TripleDES.Create();
			tdes.Key = keyArray;
			tdes.Mode = CipherMode.ECB;
			tdes.Padding = PaddingMode.PKCS7;

			ICryptoTransform cTransform = tdes.CreateDecryptor();
			byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
			tdes.Clear();
			return UTF8Encoding.UTF8.GetString(resultArray);
		}


		public static String GetExceptionDetails(Exception pException, int pMaxSize = 0)
		{
			if (pException == null)
				return null;
			Exception ex = pException;
			StringBuilder sb = new StringBuilder();

			sb.AppendLineEx(GetExceptionMessages(pException));
			sb.AppendLineEx(GetExceptionStack(pException));
			if (pMaxSize > 0 && sb.Length > pMaxSize)
				return sb.ToString().Substring(0, pMaxSize);
			return sb.ToString();
		}

		public static String GetExceptionStack(Exception pException)
		{
			if (pException == null)
				return "";
			Exception ex = pException;
			StringBuilder sb = new StringBuilder();
			while (ex != null)
			{
				if (ex is ReflectionTypeLoadException)
				{
					ReflectionTypeLoadException rtle = (ReflectionTypeLoadException)ex;
					foreach (Exception item in rtle.LoaderExceptions)
						sb.AppendLineEx(GetExceptionStack(item));
				}
				else
				{
					sb.AppendLineEx("***********************************************");
					sb.AppendLineEx(ex.GetType().FullName + " " + ex.Message);
					sb.AppendLineEx("***********************************************");
					sb.AppendLineEx(ex.StackTrace);
				}
				if (pException is SqlException sqlex)
					foreach (SqlError e in sqlex.Errors)
						sb.AppendLineEx(ex.Message);
				ex = ex.InnerException;
			}
			return sb.ToString();
		}

		public static String GetExceptionMessage(Exception pException)
		{
			Exception ex = pException;
			while (ex != null)
			{
				if (!(ex is XThrowContainer))
					return ex.Message;
				ex = ex.InnerException;
			}
			return pException?.Message;
		}

		public static String GetExceptionMessages(Exception pException, Int32 pCount = 0)
		{
			Exception ex = pException;
			StringBuilder sb = new StringBuilder();
			while (ex != null)
			{
				if (!(ex is XThrowContainer))
				{
					if (ex is ReflectionTypeLoadException)
					{
						ReflectionTypeLoadException rtle = (ReflectionTypeLoadException)ex;
						foreach (Exception item in rtle.LoaderExceptions)
							sb.Append(GetExceptionMessages(item, pCount));
					}
					else
					{
						if (ex.Message.IsEmpty())
						{
							ex = ex.InnerException;
							continue;
						}
						if (pCount == -1)
							sb.Append(ex.Message);
						else
						{
							pCount++;
							sb.Append(" -> " + ex.Message);
						}
					}
				}
				if (pException is SqlException sqlex)
					foreach (SqlError e in sqlex.Errors)
						sb.Append(" -> " + e.Message);
				ex = ex.InnerException;
			}
			return sb.ToString();
		}
	}
}
